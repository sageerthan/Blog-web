import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom'
import '../App.css';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';

export const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function loginHandler(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    if (response.status === 200) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }
    else {
      toast.error('Login Failed', {
        position: "top-center",
        theme: "colored",
      })
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className='container'>
      <form className="login" onSubmit={loginHandler}>
        <h1>Login</h1>
        <input type="text"
          placeholder='Username'
          value={username}
          onChange={(e) => setUserName(e.target.value)} />

        <input type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>

  )
}
