import React from "react";
import NoteItem from '../utils/noteItem'
import {useBlogContext} from '../../context/blogcontext'


function YourBlog() {
  var {blogs} = useBlogContext();
  if(blogs.length===0){
    return (
      <div className="container" style={{marginTop: '30px'}}><h1>Write a blog to see</h1></div>
    );
  }
  else{
    return (
      <div style={{margin: '10px', padding: '30px'}}>
        
        <ul style={{listStyleType:'none'}}>
        <NoteItem/>
        </ul>
      </div>
    );
  }
  
}

export default YourBlog;
