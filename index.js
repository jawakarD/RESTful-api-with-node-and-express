import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/crmRoutes'
import bodyParser from 'body-parser'
import jsonwebtoken from 'jsonwebtoken';
import User from './src/models/userModel'


const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongo_learning', { useNewUrlParser: true });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//JWT setup
app.use((req,res,next)=>{
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode)=>{
      if(err){
        req.user = undefined;
        console.log(err);
      }
      req.user = decode;
      console.log(decode);
      next();
    });
  }else{
    req.user = undefined;
    next();
  }
})

routes(app);

app.get('/',(req,res)=>{
  res.send(`Node and express server is running on ${PORT}`);
})

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})
