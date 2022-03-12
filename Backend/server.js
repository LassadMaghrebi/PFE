const express = require("express");
const bodyParser=require('body-parser')
const mongoose=require('./Config/dbConnect')
const cors = require("cors");
const authRoutes = require('./Routes/auth.routes')
const dotenv =require('dotenv').config()

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/auth',authRoutes)



app.listen(3000, () => {
    console.log(`Server is running on port ${3000}.`);
  });