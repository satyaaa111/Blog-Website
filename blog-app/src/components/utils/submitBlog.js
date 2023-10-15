import React, { useState } from 'react'
import {useBlogContext} from '../../context/blogcontext'
import { v4 as uuidv4 } from 'uuid';

function SubmitBlog() {
  
  const {addBlog} = useBlogContext();

  const [blog, setBlog]= useState({title:'', description:''});

  const onchange = (e)=>{

     setBlog({...blog, [e.target.name]: e.target.value});
     console.log(e.target.value);

  }



  const handleClick= (e)=>{

    const newBlog = { ...blog};
    console.log(newBlog);
     addBlog(newBlog);
     
     setBlog({title:'', description:''});

  }

  return (
    <div>
      <main className="container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            id="title"
            name='title' 
            onChange={onchange}
            value={blog.title}
          />

        </div>
        <div className="mb-3 ">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            style={{ height:'200px', resize: 'none'}}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            id="description"
            name='description'
            onChange={onchange}
            value={blog.description}
          />
          <div id="emailHelp" className="form-text">
            "Paste your Thoughts Here"
          </div>
        </div>
        <div className="mb-3 form-check">
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </main>
    </div>
  )
}

export default SubmitBlog;



// function generateRandomId(length) {
//   const randomId = Math.random().toString(36).substring(2, length);
//   return randomId;
// }



// const randomId = generateRandomId(10); // Generate a 10-character random ID
//      console.log(randomId);
//      setBlog({_id: randomId});