const User = require('../models/User');



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


module.exports = {signup};