const express=require('express');
const gravatar=require('gravatar');
const router =express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const{check, validationResult } = require('express-validator');

const User = require('../../models/user');

const bcrypt = require('bcryptjs');
// @route  POST api/users

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],

async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        let email=req.body.email;
        let Name=req.body.name;
        let password=req.body.password;

        let user=await User.findOne({email});

        if(user){
           return res.status(400).json({error:[{msg: 'User already exists'}]});

        }

        const avatar = gravatar.url(email,{
            s:'200',
            r: 'pg',
            d: 'mm'
        })

        user=new User({
            Name,
            email,
            avatar,
            password
        })

        const salt= await bcrypt.genSalt(10);
        user.password= await bcrypt.hash(password, salt);
        //Anything which returns a promise we need to put await in front of it
        await user.save();
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

//see if the user exists

module.exports=router;