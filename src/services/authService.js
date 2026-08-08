const User = require('../models/User');
const RefreshToken = require('../models/refreshToken');
const {generateAccessToken, generateRefreshToken} = require('../utils/generateToken');



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
    const refreshToken = generateRefreshToken(user._id);

    await RefreshToken.create(
        {
            token:refreshToken,
            user:user._id,
            expiresAt:new Date(Date.now()+7*24*60*60*1000),  // in ms time  
        }
    );

    return {
        accessToken,
        refreshToken,
        user:{
            id: user._id,
            name : user.name,
            email : user.email,
        },

    };
};



module.exports = {signup,login};