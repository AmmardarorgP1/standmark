const workspaceService = require('../services/workspaceService');


const createWorkspace = async(req,res,next)=>{


    try
    {
        const result = await workspaceService.createWorkspace({
            name: req.body.name,
            ownerId :req.user.id
        });

        res.status(200).json({
            success:'true',
            message:'Workspace created successfully',
            data:result,

        });


    }
    catch(error)
    {
        next(error);
    }
};

module.exports = {createWorkspace};