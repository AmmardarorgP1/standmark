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


const login = async(req,res,next)=>
{
    try{
        const result = await authService.login(req.body);
        res.status(200).json(
            {
                success:'true',
                message:'Login Successfully',
                data:result,
            }
        );
    }
    catch(error)
    {
        next(error);
    }
};


const getMe = async(req,res,next)=>
{
    try
    {
        res.status(200).json({
            success: true,
            data:{
                user:req.user
            },

        });
        
    }
    catch(error)
    {
        next(error);
    }

}


const refresh  = async(req,res,next)=>
{
    try
    {
        const result = await authService.refresh(req.body.refreshToken);
        res.status(200).json({

            success:true,
            message:"Token refreshed",
            data: result
        });

    }catch(error)
    {
        next(error);
    }

}


module.exports = {signup,login,getMe,refresh };

