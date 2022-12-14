const User = require('../models/user');
const Otp = require('../models/otp');
const jwt = require('jsonwebtoken');
const { validationResults } = require('express-validator');
const nodemailer = require('nodemailer');
const { compareSync } = require('bcrypt');
require("dotenv").config();
const bcrypt = require('bcrypt');



exports.signup = (req,res) => {

    User.findOne({email: req.body.email }).exec((error,user) => {
        if(error || user) return res.status(400).json({
            message: 'user already registred'
        });

        const {
            firstName,
            lastName,
            email,
            password

        } = req.body;
        const _user = new User({ 
            firstName,
            lastName,
            email,
            password,
            userName: Math.random().toString()
        });
        _user.save((error, data) => {
            if(error){
                returnres.status(400).jason({
                    message: 'something went wrong'
                });
            }

            if(data){
                return res.status(201).json({
                    message: 'User created Successfully..!'
                })
            }
        });
    });
}
exports.signin = (req,res) => {
    
    User.findOne({email: req.body.email}).exec((error,user) => {
        
        
        if(user){
            
            if(user.authenticate(req.body.password)){
                
                const token = jwt.sign({ _id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
                const {_id, firstName,lastName,email,role,fullName} = user;
                res.json({
                    code:0,
                    token,
                    user: {
                        _id, firstName,lastName,email,role,fullName
                    }
                });
            }
            else{
                return res.json({code:1,message: 'Incorrect passowrd'})
            }

        }else{
            return res.json({code:1,message: 'User not found'});
        }
    });
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    
    secure:false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


exports.sendEmail = async (req,res) => {
    const email = req.body.email;
    // console.log(email);
   
     
    if(!email)
    {
        res.status(400).json({message:"Enter your email"})
    }
   
        const userfind = await User.findOne({email: email});
        if(!userfind)
        {
            res.status(400).json({message:"user with given email doesn't exist"})
        }
        const t = jwt.sign({ _id: userfind._id, role: userfind.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
        let token = await Otp.findOne({ userId: userfind._id });
        if (!token) {
            token = await new Otp({
                userId: userfind._id,
                token: t,
            }).save();
        }
        
  
            const mailOptions ={ 
                
                from:'pateldrashti1708@gmail.com',
                to:req.body.email,
                subject:'Sending Email for password reset',
                text: `This link valid for 2 MINUTES http://localhost:4000/ForgotPassword/${userfind._id}/${token.token}`
            };
            
            transporter.sendMail(mailOptions,(error,info)=>{
                // console.log("abc");
                if(error){
                    console.log(error);
                    res.status(400).json({message:"email not send"})
                }else{
                    // console.log('Email sent: '+ info.response);
                    res.json({message: "password reset link successfully send to your meail"})
                }

            })

        

    
    

}




exports.changePassword = async(req,res) => {
    var id = req.body.id;
    
   try{
    let user = await User.findById(id);
        if(!user)
        {
            return res.json({message: 'Invalid User'})
        }
        if(user){
            const token = await Otp.findOne({
                userId: user._id,
                token: req.body.token,
            });
            if (!token) return res.status(400).send("Invalid link or expired");
            user.password = req.body.password;
            await user.save();
            await token.delete();
            res.send({message: "password reset sucessfully."});
            
            
        }
    }catch(error){
        res.send({message: "An error occured"});
        console.log(error);
    }
   

    

    }
    