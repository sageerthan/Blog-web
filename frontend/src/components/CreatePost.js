import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
export const CreatePost = () => {
    const [title,setTitle]=useState('');
    const[summary,setSummary]=useState('');
    const[content,setContent]=useState('');
    const[files,setFiles]=useState(null);
    const[redirect,setRedirect]=useState(false);
    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
      };
      async function createNewPost(e){
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
          e.preventDefault();

          const response =await fetch('http://localhost:8000/api/v1/post',{
            method:'POST',
            body:data,
            credentials:'include'
          })
          if(response.ok){
            setRedirect(true);
          }
      }
      if(redirect){
       return <Navigate to={'/'}/>
      }

  return (
  <div className='container'>
    <form className='createPost' onSubmit={createNewPost}>
        <input type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)} />

        <input type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e)=>setSummary(e.target.value)}/>

        <input type="file"  onChange={e=>setFiles(e.target.files)}/>

        <ReactQuill value={content} 
        modules={modules} 
        onChange={(newValue)=>setContent(newValue)}/>

        <button style={{background:'green',marginTop:'5px'}}>Create post</button>
    </form>
  </div>
  )
}
