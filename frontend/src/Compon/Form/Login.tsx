import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface LoginProps {
    onLoginSuccess: (token:string) => void
}

const Login: React.FC<LoginProps> = ({onLoginSuccess}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:7000/login', {
                username,
                password,
            });

            const {token} = response.data;
            onLoginSuccess(token)
            navigate('/')
        } catch(error) {
            setError('Invalid credentials');
        }
    };

    return(
        <div className="h-screen flex justify-center items-center bg-slate-100">
            <div className="font-medium text-lg p-4 md:p-8 max-w-80 md:max-w-96">
                <form onSubmit={handleLogin}>
                    <div className="py-2">
                        <label className="flex text-4xl font-bold justify-center">
                            Login
                        </label>
                    </div>
                    <div className="py-2">
                        <label className="flex justify-between items-center">
                            Username: 
                        </label>
                        <motion.input whileHover={{scale:1.1}} whileFocus={{scale:1.1}} className="w-full border-2 border-slate-400 bg-slate-100 font-sans rounded-xl py-1 px-2" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="py-2 pb-4">
                        <label className="flex justify-between">
                            Password:
                        </label>
                        <motion.input whileHover={{scale:1.1}} whileFocus={{scale:1.1}} className="w-full border-2 border-slate-400 bg-slate-100 font-sans rounded-xl py-1 px-2" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="text-red-600"> {error} </p> }
                    <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="py-1.5 px-2 rounded-xl bg-cyan-400 text-slate-100" type="submit">Login</motion.button>
                </form>
            </div>
        </div>
    );
}

export default Login