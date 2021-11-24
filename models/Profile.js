const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    location: {
        type: String,
        required:true
      },
    year:{
      type:String,
      required:true
    } , 
    school:{
      type:String,
      required: true
    },
    company: {
        type: String
      },
    website: {
        type: String
      },
    bio: {
        type: String,
        required: true
      },
      
    linkedin: {
          type: String
        },
    instagram: {
          type: String
        }

});

module.exports=Profile=mongoose.model('profile',ProfileSchema);