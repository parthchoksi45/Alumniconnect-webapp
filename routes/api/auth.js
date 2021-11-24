const express=require('express');
const router=express.Router();

const auth=require('../../middleware/auth');
const User = require('../../models/user');

const jwt = require('jsonwebtoken');
const config = require('config');

const bcrypt = require('bcryptjs');
const{check, validationResult } = require('express-validator');

// @route  GET api/auth

router.get('/',auth,async (req,res)=>{

    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.log(err.mssg);
        res.status(500).send("Server Error");
    }
})

// @route POST api/auth
// Used for login and generating token and sending back to user

router.post('/',
[
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password ').exists()
]
,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        let email=req.body.email;
        let password=req.body.password;

        let user=await User.findOne({email});
        if(!user){
           return res.status(400).json({error:[{msg: 'Invalid Credentials'}]});

        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({error:[{msg: 'Invalid Credentials'}]});
        }
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),
        {expiresIn : 360000},
        (err, token)=>{
            if(err)
            throw err;
            console.log(token);
           res.json({token});
        }
        );
       // res.send('User Registered');

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})
module.exports=router;