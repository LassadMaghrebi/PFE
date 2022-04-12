const express = require("express");
const bodyParser=require('body-parser')
require('./Config/dbConnect')
require('dotenv').config()
const cors = require("cors");

const authRoutes = require('./Routes/auth.routes')

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/auth',authRoutes)



app.listen(3000, () => {
    console.log(`Server is running on port ${3000}.`);
  });