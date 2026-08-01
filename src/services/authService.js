const User = require('../models/User');
const {generateAccessToken} = require('../utils/generateToken');



const signup = async ({name,email,password})=>{


    const existingUser = await User.findOne({email});

    if(existingUser)
    {
        const error = new Error('Email already registered');
        error.statusCode = 409;   // shows conflict in registration
        throw error;
    }


    const user = await User.create({name,email,password});

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};


const login = async({email,password})=>{
    const user = await User.findOne({email});
    if(!user)
    {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await user.comparePassword(password); 

    if(!isMatch)
    {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }
    const accessToken = generateAccessToken(user._id);

    return {
        accessToken,
        user:{
            id: user._id,
            name : user.name,
            email : user.email,
        },

    };
};



module.exports = {signup,login};