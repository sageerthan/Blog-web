import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { Navigate, useParams } from 'react-router-dom';

export const EditPost = () => {
    const[title,setTitle]=useState('');
    const[summary,setSummary]=useState('');
    const[content,setContent]=useState('');
    const[files,setFiles]=useState(null);
    const[redirect,setRedirect]=useState(false);
    const[cover,setCover]=useState('');
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
    const{id}=useParams();
    
    useEffect(()=>{
        fetch('http://localhost:8000/api/v1/post/'+id)
        .then(response=>response.json())
        .then(postData=>{
            setTitle(postData.post.title);
            setContent(postData.post.content);
            setSummary(postData.post.summary);
        })
    },[])
    async function updatePost(e){
        e.preventDefault();
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if (files && files[0]) {
          data.set('file', files[0]);
      }
        const response=await fetch('http://localhost:8000/api/v1/post',{
            method:'PUT',
            body:data,
            credentials:'include'

        })
        if(response.ok){
            setRedirect(true);
        }
        
   }


    if(redirect){
        return <Navigate to={`/`}/>
       }
  return (
    <div className='container'>
    <form className='createPost' onSubmit={updatePost}>
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

        <button style={{background:'green',marginTop:'5px'}}>Update post</button>
    </form>
  </div>
  )
}
