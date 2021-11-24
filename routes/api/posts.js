const express=require('express');
const {check,validationResult}=require('express-validator');
const router=express.Router();
const auth =require('../../middleware/auth');

const Posts=require('../../models/Post');
const User=require('../../models/user');
const Profile=require('../../models/Profile');
const Post = require('../../models/Post');
//@route POST api/posts
//@desc Create a post

router.post('/',[auth,check('text','Text is required').not().isEmpty()],
async (req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty())
    return res.status(400).json({errors:errors.array});

    try{
        const user= await User.findById(req.user.id).select('-password');

        const newPost={
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        const post =new Posts(newPost);
        post.save();
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
   
}
)
//@route GET api/posts
//@desc get all posts

router.get('/',auth, async (req,res)=>{
    try{
        const posts= await Posts.find().sort({date: -1});
        res.json(posts);
    }
    catch(err){
        console.log(err.errors);
        res.status(500).send("Server Error");
    }
})

//@route GET api/posts/:id
//@desc get a post by its id

router.get('/:id',auth, async (req,res)=>{
    try{
        const post= await Posts.findById(req.params.id);
        if(!post)
        res.status(404).send("Not found");
        res.json(post);
    }
    catch(err){
        console.log(err.errors);
        res.status(500).send("Server Error");
    }
})

//@route DELETE api/posts/:id
//@desc get a post by its id

router.delete('/:id',auth, async (req,res)=>{
    try{
        const post= await Posts.findById(req.params.id);
        if(post.user.toString()!=req.user.id){
            res.status(401).send("User not authorized");
        }
        if(!post)
        res.status(404).send("There is no such post");

        await Posts.findByIdAndRemove(req.params.id);
        res.json("Post deleted");
    }
    catch(err){
        console.log(err.errors);
        res.status(500).send("Server Error");
    }
})

//@route PUT api/posts/like/:id
//@desc to like a post
router.put('/like/:id',auth, async (req,res)=>{
    try{
        const post =await Post.findById(req.params.id);

        //check if the post has already been liked

        if(post.likes.filter(like =>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({msg :'post already liked'});

        }
        post.likes.unshift({user: req.user.id});
        await post.save();
        return res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route PUT api/posts/unlike/:id
//@desc to unlike a post

router.put('/unlike/:id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        //check if the post is not liked by that user
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({msg :'Post not liked'});
        }
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);

        await post.save();

        res.status(200).json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Bad Request")
    }
})

//@route PUT api/posts/comments/:id
//@route to add comments

router.put('/comments/:id',[auth,check('text','Text is required').not().isEmpty()], async (req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty())
    return res.status(400).json({errors:errors.array});


    try{
        const user=await User.findById(req.user.id).select('-password');
        const post =await Post.findById(req.params.id);
        
        const newComment={
            text: req.body.text,
            name: user.name,
            avatar:user.avatar,
            user:req.user.id
        }
        post.comments.unshift(newComment);
        await post.save();

        return res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route DELETE api/posts/:post_id/:comment_id
//@route to delete comments

router.delete('/comments/:post_id/:comment_id',[auth], async (req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty())
    return res.status(400).json({errors:errors.array});


    try{
        const user=await User.findById(req.user.id).select('-password');
        const post =await Post.findById(req.params.post_id);
        
        const comment=post.comments.find(comment=> comment.id===req.params.comment_id);
        
        if(!comment)
        return res.status(404).json({msg: 'Comment does not exist'});

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User unauthorized'});
        }
        const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex,1);

        await post.save();

        return res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports=router;