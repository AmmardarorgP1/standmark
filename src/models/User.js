const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

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


userSchema.pre('save',async function(){
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);
  

});
  
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword,this.password);
    
};


const User = mongoose.model('User',userSchema);

module.exports = User;

