require('dotenv').config();

const cors = require("cors");
const express = require("express");
const multer = require('multer');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const upload = multer({ storage: multer.memoryStorage() });
const Pool = require('pg').Pool;
const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database: "test",
    password: "276183495",
    port: 5432
});
let app = express();
let corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello Adiot.');
})

app.get('/items', async (req, res) => {
    try {
        const result = await pool.query('select * from items');
        const items = result.rows.map(item => ({
            ...item,
            image: item.image.toString('base64')
        }))
        res.json(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/upload', upload.single('image'), async (req, res) => {
  try {

    if(!req.file) {
        throw new Error("No file uploaded")
    }

    const { name, description } = req.body;
    const image_data = req.file.buffer;

    const result = await pool.query(
      'INSERT INTO items (name, description, image) VALUES ($1, $2, $3) RETURNING *',
      [name, description, image_data]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console;e.error('Error uploading image: ', error);
    res.status(500).send({message: 'Error uploading image', error: error.message});
  }
});

app.post ('/register', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'insert into users (username, password) values ($1, $2) returning *',
            [username, hashedPassword]
        );
        res.status(201).send(result.rows[0]);
    } catch (error) {
        res.status(500).send('Error registering user');
    }
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if(!username||!password) {
        return res.status(400).send('Username and password are required');
    }
    try {
        console.log('Fetch user from database');
        const result = await pool.query('select * from users where username = $1', [username]);
        const user = result.rows[0];

        if(!user) {
            console.log('User not found');
        }
        console.log('Comparing passwords');
        const math = await bcrypt.compare(password, user.password);

        if(math) {
            console.log('Password match, generating token');
            const token = jwt.sign({id:user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
            return res.status(200).send({ token })
        } else {
            console.log("Password doesn't match.")
            return res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        console.error('Error logging in user: ', error);
        res.status(500).send('Error logging in user');
    }
})

let server= app.listen(7000, () => {
    console.log("Server is running ใน port 7000.")
})