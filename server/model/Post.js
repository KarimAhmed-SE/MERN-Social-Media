import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

userId:{
    type:String,
    required:true,
},
firstName:{
    type:String,
    required: true,
},
lastName:{
    type:String,
    required: true,
},
description:{
    type:String,
    required: true,
},
userPic:{
    type:String,
    required: true,
},
pic:{
    type:String,
},
likes:{
    type:Map,
    of:Boolean,
},
comments:{
    type:Array,
    default: [],
},

});

const Post = mongoose.model("Post", postSchema);

export default Post;