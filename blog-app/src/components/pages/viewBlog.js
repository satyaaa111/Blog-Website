import React from "react";
import { useParams } from "react-router-dom";
import {useBlogContext} from '../../context/blogcontext'
import { useNavigate } from 'react-router-dom';



function ViewBlog() {
  const navigate = useNavigate();
  const { _id } = useParams();
  
  const {blogs, deleteBlog}= useBlogContext();

  const handleClick=(id)=>{

       console.log(id);
       deleteBlog(id);
       navigate('/');

  }
  const id = decodeURIComponent(_id);
  const blog = blogs.find((obj) => obj._id === id);
  console.log(blog);
  return (
    <div>
      <div className="container" style={{ margin: "20px" }}>
        <h1>{blog.title}</h1>

        <p>{blog.description}</p>
         
        
        
  
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          delete
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                 Are you sure you want to delete the Blog?
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">:-(</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  no
                </button>
                <button type="button" className="btn btn-primary" onClick={()=>{handleClick(id)}} data-dismiss="modal">
                  yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
