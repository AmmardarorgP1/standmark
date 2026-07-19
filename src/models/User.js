const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(

    {

        name:{
            type: String,
            required: true,
            trim: true

        },

        email:{
            type: String,
            required: true,
            unique:true,
            lowercase:true,
            trim:true,

        },

        password:{
            type: String,
            required: true,


        },

        avatar:{
            type: String,
            default: ''
        },

        jobtitle:
        {
            type: String,
            default: ''
        },

        timezone: {
            type: String,
            default: 'Asia/Karachi'
        }
    },
    {
        timestamps: true,

    }
);


const User = mongoose.model('User',userSchema);

module.exports = User;

