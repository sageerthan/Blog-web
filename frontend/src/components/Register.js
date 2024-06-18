import React, { useState } from 'react';
import '../App.css';
import {toast} from 'react-toastify';

export const Register = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function registerHandler(e) {
    e.preventDefault();

    const response=await fetch('http://localhost:8000/api/v1/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
   if(response.status===200){
    toast.success("Registration Success")
   }
   else{
    toast.error("Registration Failed")
   }

  }
  return (
    <div className='container'>
      <form className="register" onSubmit={registerHandler}>
        <h1>Register</h1>
        <input type="text"
          placeholder='Enter Username'
          value={username}
          onChange={e => setUserName(e.target.value)} />

        <input type='password'
          placeholder='Enter Password'
          value={password}
          onChange={e => setPassword(e.target.value)} />

        <button>Register</button>

      </form>
    </div>
  )
}
