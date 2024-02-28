import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import 'dotenv/config'
import validator from "validator";


const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type:String,
            required: [true, 'Please enter a first name'],
            min:2,
            max:50,

        },
        lastName: {
            type:String,
            required:[true, 'Please enter a last name'],
            min:2,
            max:50,

        },
        email: {
            type:String,
            required: [true, 'Please enter an email'],
            unique: [true, 'Email already exists! Please log in.'],
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid email']

        },
        password: {
            type:String,
            required: [true, 'Please enter a password!'],
            minlength: [6, 'Minimum length of the password is 6 characters']
        },
        sex:{
            type:String,
            required:[true, 'Please choose a sex'],
        },
        country:{
            type:String,
            required:[true, 'Please choose a country'],
        },
        profilePic: {
            type:String,
          default:"",

        },
        banner: {
            type:String,
            default:"",
        },
        friends: {
            type:Array,
           default:[]

        },
        location:String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,


    }, {timestamps: true}
);


const User = mongoose.model("User", UserSchema);

export default User;