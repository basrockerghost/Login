import React, { useEffect, useState } from 'react'
import Navbar from "../Nav/Navbar"
import axios from 'axios';

interface test {
  id: number;
  name: string;
  description:string;
  image: string;
}

const HomePage: React.FC = () => {

  const[items, setItems] = useState<test[]>([]);

  useEffect(() => {
    axios.get<test[]>('http://localhost:7000/items')
    .then(response => setItems(response.data))
    .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Navbar/>
        <div>
        <h1 className="font-semibold text-4xl px-20 py-10">Blog</h1>
            <div className='flex flex-col items-center'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-12 px-12 pb-8'>
              {items.map(item => (
                <div key={item.id} className='flex flex-col p-5 justify-center items-center rounded-2xl md:w-72 bg-slate-200' >
                  <img className='w-10/12' src={`data:image/jpeg;base64, ${item.image}`} alt="{item.name}" />
                  <h2 className='font-semibold text-3xl'>{item.name}</h2>
                  <p className='text-lg'>{item.description}</p>
                </div>
              ))}
            </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage