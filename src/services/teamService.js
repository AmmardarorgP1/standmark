const Team = require('../models/Teams');
const TeamMember = require('../models/TeamMember');
const Workspace = require('../models/Workspace');
const { generateJoinCode } = require('../utils/generateJoinCode');


const createTeam = async ({ name, workspaceId, userId }) => {
    const workspace = await Workspace.findById( workspaceId );
    if (!workspace) {
        const error = new Error('Workspace not found');
        error.statusCode = 404;
        throw error;
    }

    if (workspace.ownerId.toString() !== userId.toString()) {
        const error = new Error('Only the workspace can create teams');
        error.statusCode = 403;
        throw error;
    }   

    const team = await Team.create(
        {
            name,
            workspaceId,    
            createdBy: userId,
            joinCode: generateJoinCode(),
        });

    await TeamMember.create(
        {
            userId,
            teamId: team._id,
            workspaceId,
            role:'manager'
        });


        return { id: team._id,
            name: team.name,
            joinCode: team.joinCode,
        };
};


module.exports = {createTeam};