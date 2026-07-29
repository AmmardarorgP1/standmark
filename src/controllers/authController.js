const authService = require('../services/authService');




const signup = async(req,res,next)=>{
    try{
        const result = await authService.signup(req.body);
        res.status(201).json(
            {
                success:true,
                message:'Account Created Successfully',   
                data: result,
            }
        );
    }catch(error)
    {
        next(error);
    }
};


module.exports = {signup};

