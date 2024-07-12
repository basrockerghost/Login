import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddPage: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if(image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:7000/upload', {
                method: "POST",
                body: formData,
            });
            if(!response.ok) {
                throw new Error('Failed to upload image');
            }

            const result = await response.json()
            console.log('Upload item: ',result);
            navigate('/')
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    }

    return(
        <div className="h-screen flex justify-center items-center bg-slate-200">
            <div className="font-medium text-lg p-4 md:p-8 max-w-80 md:max-w-96">
                <form onSubmit={handleSubmit}>
                    <div className="py-2">
                        <label className="flex justify-center font-bold text-3xl" htmlFor="">Add</label>
                    </div>
                    <div className=" py-2">
                        <label className="flex justify-between items-center">
                            Name:
                        </label>
                        <motion.input whileFocus={{scale: 1.1}} whileHover={{scale:1.1}} className="w-full rounded-xl py-1 px-2 border-2 border-slate-400 bg-slate-100 font-sans" type="text" value={name} onChange={e=> setName(e.target.value)} required />
                    </div>
                    <div className="py-2">
                        <label className="flex justify-between items-center">
                            Description:
                        </label>
                        <motion.input whileFocus={{scale: 1.1}} whileHover={{scale:1.1}} className="w-full rounded-xl py-1 px-2 border-2 border-slate-400 bg-slate-100 font-sans" value={description} onChange={e=> setDescription(e.target.value)} required />
                    </div>
                    <div className="py-2">
                        <label className="flex justify-between items-center">
                            Image:
                            <input type="file" onChange={e=> setImage(e.target.files?.[0] || null)} required />
                        </label>
                    </div>
                    <div className="pt-2">
                    <motion.button whileHover={{scale: 1.15}} whileTap={{scale: 0.9}} className="py-2"><Link to="/">Back</Link></motion.button>
                    <motion.button whileHover={{scale: 1.15}} whileTap={{scale: 0.9}} className="bg-cyan-400 rounded-xl px-3 text-slate-100 py-1 mx-6" type="submit">Upload</motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPage