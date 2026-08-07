const jwt = require('jsonwebtoken');




const protect = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        const error = new Error("Not authorized");
        error.statusCode = 401;
        return next(error);
    }


    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {id: decoded.userId};
        next();
    }
    catch(error)
    {
        error.statusCode = 401;
        error.message = 'Not authorized,token failed';
        return next(error);
    }
};


module.exports = {protect};