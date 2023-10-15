import React, {useEffect} from 'react'
import {useBlogContext} from '../../context/blogcontext'
import { Link } from "react-router-dom";



function Notes() {
  const {blogs} = useBlogContext();
  return (
     blogs.map((blog)=>{
      return(
         <li style={{display:'inline-block', marginRight: '10px',marginTop:'10px'}}>
          <div
            className="card"
            style={{ width: "18rem", height: "11rem", overflow: "hidden" }}
          >
            <div className="card-body" style={{ paddingBottom: "10px" }}>
              <h5 className="card-title">{blog.title.length<20?blog.title:`${ blog.title.substring(0,40)}...`}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Subtitle</h6>
              <p className="card-text ">
                {blog.description.substring(0, 60)}...
              </p>
            </div>
            <Link to={`/viewBlog/${encodeURIComponent(blog._id)}`} style={{position:'absolute', bottom:'15px', left:'20px'}}>View</Link>
            <Link to={`/editBlog/${encodeURIComponent(blog.title)}/${encodeURIComponent(blog.description)}/${encodeURIComponent(blog._id)}`} style={{position:'absolute', bottom:'15px', right:'25px'}}>Edit</Link>
          </div>
         </li>
        ) 
     }
     )
  );
}

export default Notes;



// blog.title.substring(0,50)