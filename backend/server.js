const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');
if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}

app.use(cors( {
  origin: process.env.CLIENT_URL, // replace with your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stations', require('./routes/stations'));

const MONGO_URL=process.env.MONGO_URL;
main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}


const PORT = process.env.PORT || 8000;
app.listen(PORT,(req,res)=>{
   console.log(`Listening to port ${PORT}`)
});