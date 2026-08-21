const teamService = require('../services/teamService');



const createTeam = async (req, res, next) => {
    try {
        const result = await teamService.createTeam({
            name: req.body.name,
            workspaceId: req.body.workspaceId,
            userId: req.user.id
        });

        res.status(201).json({
            success: true,
            message: 'Team created successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};


const joinTeam = async (req, res, next) => {
    try {
        const result = await teamService.joinTeam(
            {
                joinCode: req.body.joinCode,
                userId: req.user.id
            });

        res.status(200).json({
            success: true,
            message: "Joined Team Successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }

};



const listTeamMembers = async(req,res,next)=>
{
    try
    {
        const result = await teamService.listTeamMembers({
            teamId: req.params.teamId,    // GET request so no req.body
            userId: req.user.id,

        });

        res.status(200).json({
            success:true,
            data:{members:result}
        });
    }catch(error)
    {
        next(error);
    }
}


module.exports = { createTeam, joinTeam, listTeamMembers };