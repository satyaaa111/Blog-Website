import React, { useState } from 'react'
import {useBlogContext} from '../../context/blogcontext'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Edit() {
   
  const navigate = useNavigate();
  const {editBlog} = useBlogContext();
  
  const { title, description, _id } = useParams();

  const [editblog, setBlog]= useState({title:`${decodeURIComponent(title)}`, description:`${decodeURIComponent(description)}`,_id:`${decodeURIComponent(_id)}`});

  const onchange = (e)=>{

     setBlog({...editblog, [e.target.name]: e.target.value});
     console.log(e.target.value);

  }



  const handleClick= (e)=>{

    console.log(editblog);
     editBlog(editblog);
     navigate('/yourBlog');
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
            value={editblog.title}
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
            value={editblog.description}
          />
        </div>
        <div className="mb-3 form-check">
        </div>


        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Save
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
                <button type="button" className="btn btn-primary" onClick={()=>{handleClick()}} data-dismiss="modal">
                  yes
                </button>
              </div>
            </div>
          </div>
          </div>

      
      </main>
    </div>
  )
}

export default Edit;

