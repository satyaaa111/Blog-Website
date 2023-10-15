import bodyParser from "body-parser";
import express from 'express';
import connectToMongo from './db.js'
import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blog.js'
import cors from 'cors'

connectToMongo();

const app = express();
app.use(cors());
const port = 5000;
app.use(bodyParser.urlencoded({extended: true}));



//get request
app.get("/", (req, res)=>{
   res.send("Hello");
});



//Routes
app.use("/api/auth", authRoutes);
app.use('/api/blog', blogRoutes);


app.listen(port, ()=>{
  console.log("Server is running at port: "+port);
});