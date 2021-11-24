const express=require('express');
const auth = require('../../middleware/auth');
const config = require('config');
const Profile = require('../../models/Profile');
const User = require('../../models/user');
const router = express.Router();
const{check, validationResult } = require('express-validator');
//Get all user profiles
router.get('/',async (req,res)=>{
    try{
        const profiles=await Profile.find({}).populate('user',['Name','avatar']);
        if(!profiles)
        return res.status(400).json({msg : 'There are no profiles'});
        res.json(profiles);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route  GET api/profile/me
// @desc Get current user profile

router.get('/me',auth,async (req,res)=>{
    try{
        const profile=await Profile.findOne({user: req.user.id});
        if(!profile)
        return res.status(400).json({msg : 'There is no profile for this user'});
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route  POST api/profile
// @desc Create user profile
router.post( '/',[
    auth,
    [
        check('location','location is required').not().isEmpty(),
        check('year','Year of graduation is required').not().isEmpty(),
        check('school','School is required').not().isEmpty(),
        check('bio','Bio is required').not().isEmpty(),
    ]
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    return res.status(400).json({errors: errors.array()});
    

    //destructure the request

    const{
        year,
        school,
        company,
        website,
        location,
        bio,
        instagram,
        linkedin
    }=req.body;

    //build a profile object

    const profileFields ={}
    profileFields.user= req.user.id;
    profileFields.location=req.body.location;
    profileFields.year=req.body.year;
    profileFields.bio=req.body.bio;
    profileFields.school=req.body.school;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(instagram) profileFields.instagram=instagram;
    if(linkedin) profileFields.linkedin=linkedin;

  try{
    let profile= await Profile.findOne({user: req.user.id});

    if(profile){
        //profile already exists so we will update it
        profile= await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set : profileFields},
            {new:true}
        );
        return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  }
  catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
  }

},

//@route GET api/profile/user/:user_id
//@desc To get a specific user profile after they are logged in 

router.get('/user/:user_id', async (req,res)=>{

    try{
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['Name','avatar']);;

        //if we dont find that profile return an error
        if(!profile)
        {
            console.log("error in database");
            return res.status(400).json({msg:"profile not found"});
        }
        return res.json(profile);
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(400).json({msg:'Profile not found'});
    }
})
)

//@route DELETE api/profile
//@desc Delete profile,user and posts

router.delete('/',auth,async (req,res)=>{
    try{
        await Profile.findOneAndRemove({user: req.user.id});

        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: 'User removed'});
    }
    catch(err){
        console.log(err);
        res.status(400).send("bad request");
    }
})



module.exports=router;