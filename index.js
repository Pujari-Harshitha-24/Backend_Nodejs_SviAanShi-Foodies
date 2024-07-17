
const express = require("express");//importing express
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes')//accessing vendorroutes files
//vendor route details are store in main file and create an htpp server
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express()//assigning variables of expr to app
const cors = require('cors');
const path = require('path')

const PORT = 4000;//assigning to port



dotEnv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected Successfully"))//when connected to mongodb it will show this msg
    .catch((error)=>console.log(error))

app.use(bodyParser.json());//from bodyparser data convert into json format
app.use('/vendor',vendorRoutes);//middlewaresthis all
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));//where images are stored by expressjs//dynamically fetch by with image name

app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`);//callback function gives output//backticks for dynamically variables are to be  pass the ouput
})


app.use(`/home`, (req, res)=>{ //when clicked on home the output will generate 
    res.send("<h1> Welcome to SviAanShi'Foodies")//based  on this creating a output
})