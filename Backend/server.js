const express = require("express");
const cors = require("cors");
const app = express();
const dotenv =require('dotenv').config()
const stadiumRoutes = require('./Routes/stadiums.routes')
const authRoutes = require('./Routes/auth.routes')
const ownerRoutes = require('./Routes/owners.routes')
const adminRoutes = require('./Routes/admin.routes')
const reservationRoutes = require('./Routes/reservation.routes')
const bodyParser=require('body-parser')
const mongoose=require('./Config/dbConnect')
app.use(cors());
app.use(bodyParser.json())
app.use('/auth',authRoutes)
// app.use('/owner',ownerRoutes)
// app.use('/admin',adminRoutes)
app.use('/stadiums',stadiumRoutes)
app.use('/reservation',reservationRoutes)
//////////////////////

///////////////

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });