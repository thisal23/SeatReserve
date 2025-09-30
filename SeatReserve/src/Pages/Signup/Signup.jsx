import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const type = "user" ;
    const navigate = useNavigate();

    const handleRegister = async (e)=> {
        e.preventDefault();
        try{
            const res= await API.post('/auth/register', {type, name, email, password});
            console.log(res.data);
            alert('Registration Successful! Please login.');
            navigate('/login');
        }
        catch(err){
            console.log(err);
            alert('Registration Failed. Please try again.');
        }
    };

  return (
    <>
    <div className='md:w-full ms:w-10 h-screen flex md:text-xl items-center justify-center bg-[url("/src/assets/login.png")] bg-cover bg-center '>
        <div className=' bg-white flex flex-col  text-black  rounded-lg shadow-lg p-16'>
            <h1 className='text-2xl text-center font-bold'>Register</h1>
            <form onSubmit={handleRegister}>

                <div className='flex flex-col gap-1 '>
                    <label className='mt-3'>Name :</label>
                    <input className='rounded-lg p-2' type="text" value={name} placeholder='Enter your name' onChange={(e)=> setName(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-1 '>
                    <label className='mt-3'>Email :</label>
                    <input className='rounded-lg p-2' type="email" value={email} placeholder='Enter your email' onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-1 '>
                    <label className='mt-3'>Password :</label>
                    <input className='rounded-lg p-2' type="password" value={password} placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div className='flex justify-center mt-6'>
                <button className='cursor-pointer bg-primary hover:bg-green-600 text-white rounded-lg py-2 px-10' type='submit'>Register</button>

                </div>
            </form>
            <div className='mt-4 flex gap-2 justify-center'>
                <span>Already have an account ?</span>
                <a className='text-red-500' href='/login'>Login</a>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup