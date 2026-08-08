const jwt = require('jsonwebtoken');


const generateAccessToken = (userId)=>{
    return jwt.sign(                          //jwt.sign(payload, secret, options)
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:'15min'}

    );
};


const generateRefreshToken = (userId)=>{
     
    return jwt.sign(
      {userId},
      process.env.JWT_REFRESH_SECRET,
      {expiresIn: '7d'}
    );
};


module.exports = {generateAccessToken,generateRefreshToken};