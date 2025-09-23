import React from 'react'
import { useState } from 'react'
import API from '../../api/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const res = await API.post('/auth/login',{email: email, password: password});
            console.log(res.json);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.href='/';
        }
        catch(err){
            console.log(err);
            alert('Email or Password is wrong!');
        }
    }
  return (
    <>
    <div className='md:w-full ms:w-10 h-screen flex md:text-xl items-center justify-center bg-[url("/src/assets/login.png")] bg-cover bg-center '>
        <div className=' bg-white flex flex-col  text-black  rounded-lg shadow-lg p-16'>
            <h1 className='text-2xl text-center font-bold'>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='flex flex-col gap-1 '>
                    <label className='mt-3'>Email :</label>
                    <input className='rounded-lg p-2' type="email" value={email} placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-1 '>
                    <label className='mt-3'>Password :</label>
                    <input className='rounded-lg p-2' type="password" value={password} placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div className='flex justify-center mt-6'>
                <button className='cursor-pointer bg-primary hover:bg-green-600 text-white rounded-lg py-2 px-10' type='submit'>Login</button>

                </div>
            </form>
            <div className='mt-4 flex gap-2 justify-center'>
                <span>Don't have an account ?</span>
                <a className='text-red-500' href='/register' >Register</a>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login