const jwt = require('jsonwebtoken');


const generateAccessToken = (userId)=>{
    return jwt.sign(                          //jwt.sign(payload, secret, options)
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:'15min'}

    );
};


module.exports = {generateAccessToken};