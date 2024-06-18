import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

export const Header = () => {
  const{userInfo,setUserInfo}=useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:8000/api/v1/profile',{
      credentials:'include'
    }).then(response=>{
      response.json().then(userInfo=>{
         setUserInfo(userInfo);
      })
    })
  },[]);

  function logout(){
    fetch('http://localhost:8000/api/v1/logout',{
       credentials:'include',
       method:'POST'
    })
    setUserInfo(null);
  }
  const username=userInfo?.username;
  return (
    <header>
        <Link to="/" className="logo">Read Bliss</Link>
        <nav>
          {username && (
            <>
            <Link to='/create'>Create new post</Link>
            <a onClick={logout} style={{cursor:"pointer"}}>Logout</a>
            </>
          )}
          {!username && (
            <>
             <Link to="/login">Login</Link>
             <Link to="/register">Register</Link>
            </>
          )}
        </nav>
    </header>
  )
}
