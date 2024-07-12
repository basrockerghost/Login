// import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

  const[isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex place-content-end bg-slate-300">
        <div className="px-10 md:px-16 font-medium text-base md:text-xl">
          <motion.button initial={{scale:1}} whileHover={{scale:1.15}} whileTap={{scale:0.9}} animate={{rotate: isOpen ?90:0}} className='py-3' onClick={toggle} transition={{duration: 0.25}} style={{position: 'relative', zIndex:1}}>
            {isOpen? <X className='size-6 md:size-8'/>:<Menu className='size-6 md:size-8'/>}
          </motion.button>
            <AnimatePresence>
            {isOpen && (
            <motion.nav className="p-2 absolute" initial={{ opacity:0, y:-20}} animate={{opacity: 1, y:0}} exit={{opacity: 0, y:-20}} transition={{duration:0.25}}>
                <ul className="space-y-4">
                    <motion.li whileHover={{scale:1.1}} whileTap={{scale:0.9}}><a href="#">Home</a></motion.li>
                    <motion.li whileHover={{scale:1.1}} whileTap={{scale:0.9}}><Link to="/Add">Add</Link></motion.li>
                    <motion.li whileHover={{scale:1.1}} whileTap={{scale:0.9}}><Link to="/Login">Login</Link></motion.li>
                </ul>
            </motion.nav>
            )}
            </AnimatePresence>
        </div>
    </div>
  )
}

export default Navbar