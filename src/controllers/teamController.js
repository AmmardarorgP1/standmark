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


module.exports = { createTeam };