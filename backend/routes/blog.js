import express from 'express';
import fetchuser from '../middlewares/fetchuser.js';
import Blog from '../models/blogs.js';
import {  body , validationResult } from 'express-validator';

const router = express.Router();






// ROUTE 1 : Get All the individual blogs using: GET "/api/fetchblog"

router.get('/fetchblog', fetchuser ,async (req, res)=>{
  
  try {
    const blogs = await Blog.find({user: req.user.id});
    res.json(blogs);
  } catch (error) {
    return res.status(500).json({error : error.message});
  }
});





//ROUTE 2 : To Add a new Blog using POST 'api/blog/addblog'


// ,  [
//   body('title', 'Enter your full Name valid Name').isLength({min : 3}),
//   body('description','Description must be atleast 5 characters long').isLength({min : 5}),
// ]

router.post('/addblog', fetchuser ,
  async (req, res)=>{

  try {
    const {title, description, tag} = req.body;
  //if there are errors then return Bad requests and the errors
  // const errors = validationResult(req);
  // console.log(errors);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({erros: errors.array()});
  // }
  
  const blog = new Blog({
     user: req.user.id, title , description , tag
  });
  const savedBlog = await blog.save();
  res.json(savedBlog);
  } catch (error) {
    return res.status(500).json({error : error.message});
  }

});






//ROUTE 3 : Get All the blogs using: GET "/api/blog/fetchallblogs"


router.get('/fetchallblogs', async (req, res)=>{
  
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    return res.status(500).json({error : error.message});
  }
});




//ROUTE 4 : To Update an existing Blog using put 'api/blog/updateblog'


router.put('/updateblog/:id', fetchuser,async (req, res)=>{

try {
   const {title, description, tag}= req.body;

   //create a newNote object
   const newBlog = {};
   if(title){newBlog.title = title};
   if(description){newBlog.description = description};
   if(tag){newBlog.tag = tag};
   
   //Find the Blog to be updated and update it after validating the user

   let blog = await Blog.findById(req.params.id);
   if(!blog){return res.status(404).send("Not found")}
   if(blog.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
   }

   //if everything goes right then update the blog
   blog = await Blog.findByIdAndUpdate(req.params.id, {$set: newBlog}, {new:true});
   res.json({blog});
}
catch(error){
  return res.status(500).json({error : error.message});
}
})








//ROUTE 5 : To delete an existing Blog using put 'api/blog/updateblog', login required


router.delete('/deleteblog/:id', fetchuser,async (req, res)=>{

  try {

    
     //Find the Blog to be deleted and delete it after validating the user
  
     let blog = await Blog.findById(req.params.id);
     if(!blog){return res.status(404).send("Not found")}
     if(blog.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
     }

     //Allow deletion only if user owns this blog
     blog = await Blog.findByIdAndDelete(req.params.id);
     res.send("Yay the blog has been deleted");
  }
  catch(error){
    return res.status(500).json({error : error.message});
  }
  });



  
export default router;