

const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');//installed in package.json

const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName




const vendorRegister = async(req,res)=>{
    const{username,email,password} = req.body;
    
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newVendor = new Vendor({
            username,
            email,
            password:hashPassword
        });
        await newVendor.save();

        res.status(201).json({message:"Vendor registered succesfully"});
        console.log('Registered');

    }catch (error){//500 errorcode
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}


const vendorLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" })

        const vendorId = vendor._id;

        res.status(200).json({ success: "Login successful", token, vendorId })
        console.log(email, "this is token", token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}





const getAllVendors = async(req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getVendorById = async(req, res) => {
    const vendorId = req.params.harshi;

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" })
        }
        const vendorFirmId = vendor.firm[0]._id;
        res.status(200).json({ vendorId, vendorFirmId, vendor })
        console.log(vendorFirmId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById }
//vendor export function 
// module.exports = {vendorRegister}
//vendor has to store in database so we need routers




//email has unique so converting as tokens
    //password has tobe safe that is hash
    //in async take promise try and catch block
    //vendor email has to be checked....await has to be used in async definitely
    //in vendor the email ,findone method will get it the email
    //if vendot true ,,,,it is already there otherwise false means no email hasnt there before
    // 10 rounds its been executed and passed as hash password to variable hashedpassword
    //by the help of instance we are storing vendor details(name,mail...)in  database....instance name is newVendor
    //save the instance details by awit keyword
    //when succesfully details are stored in db,then it display status(vendor regist succes)
    //if incase try block gets failure the catch block can identify