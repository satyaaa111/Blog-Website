import mongoose from 'mongoose';



//to connect with mongoose and useNewUrlParser is to avoid the errors that database throws 
//and instead of localhost use 127.0.0.1 
const dbUrl = 'mongodb://127.0.0.1:27017/Blog';


const connectToMongo = ()=>{
      mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      const db = mongoose.connection;
      
      // Event listeners for successful and error connection
      db.on('connected', () => {
        console.log('Connected to MongoDB successfully');
      });
      db.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
      });
      // Close the Mongoose connection when the Node.js process terminates
      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          console.log('Mongoose connection disconnected through app termination');
          process.exit(0);
        });
      });
  
}
export default connectToMongo