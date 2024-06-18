import React, { useEffect, useState } from 'react'
import {format} from 'date-fns'
import { Link } from 'react-router-dom';
export const Post = () => {
      const[posts,setPosts]=useState([]);

      useEffect(()=>{
        fetch('http://localhost:8000/api/v1/post')
        .then(response=>response.json())
        .then(data=>setPosts(data.posts))
        },[])

    return (
        <>
        {
            posts.map(post=>(
            <div className="post">
                <div className="image">
                    <Link to={`/post/${post._id}`}>
                      <img src={'http://localhost:8000/'+post.file}/>
                    </Link>   
                </div>
                <div className="texts">
                   <Link to={`/post/${post._id}`}>
                    <h2>{post.title}</h2>
                   </Link>
                    <p className="info">
                        <a className="author">Author:{post.author.username}</a>
                        <time> {format(new Date(post.createdAt), "yyyy-MM-dd HH:mm")}</time>
                    </p>
                    <p className="details">{post.summary} </p>
                </div>
            </div>

            ))
        }
            
        </>
    )
}
