const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');



const signup = async ({ name, email, password }) => {


    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error('Email already registered');
        error.statusCode = 409;   // shows conflict in registration
        throw error;
    }


    const user = await User.create({ name, email, password });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};


const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await RefreshToken.create(
        {
            token: refreshToken,
            user: user._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // in ms time  
        }
    );

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },

    };
};


const refresh = async (refreshToken) => {

    if (!refreshToken) {
        const error = new Error('Refresh token required');
        error.statusCode = 401;
        throw error;
    }

    //verify the token is cryptographically valid

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    }
    catch (err) {
        console.error('Refresh token verification failed:', err.message);
        const error = new Error('Invalid or expired refresh token');
        error.statusCode = 401;
        throw error;
    }

    // verify  the token is not revocked from DB 

    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) {

        const error = new Error('Invalid token or expired token');
        error.statusCode = 401;
        throw error;

    }


    // rotation of token

    await RefreshToken.deleteOne({ token: refreshToken });


    // issue the new token

    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    // store the new refresh Token

    await RefreshToken.create({
        token: newRefreshToken,
        user: decoded.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });


    return { newAccessToken, newRefreshToken }





}




const logout = async(refreshToken)=>
{
    if(!refreshToken)
    {
        const error = new Error("Refresh Token required");
        error.statusCode = 400;
        throw error;
    }

    await RefreshToken.deleteOne({token: refreshToken});


    return {message : 'Logged out successfully'};
}



    module.exports = { signup, login, logout , refresh };