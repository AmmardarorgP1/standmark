const Team = require('../models/Teams');
const TeamMember = require('../models/TeamMember');
const Workspace = require('../models/Workspace');
const { generateJoinCode } = require('../utils/generateJoinCode');


const createTeam = async ({ name, workspaceId, userId }) => {
    const workspace = await Workspace.findById(workspaceId);
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


    // creates Team

    const team = await Team.create(
        {
            name,
            workspaceId,
            createdBy: userId,
            joinCode: generateJoinCode(),
        });


    //creates the owner of team a manager by default 
    await TeamMember.create(
        {
            userId,
            teamId: team._id,
            workspaceId,
            role: 'manager'
        });


    return {
        id: team._id,
        name: team.name,
        joinCode: team.joinCode,
    };
};




const joinTeam = async ({ joinCode, userId }) => {

    console.log('1. joinTeam entered. code:', joinCode, 'userId:', userId);
    const team = await Team.findOne({ joinCode: joinCode.toUpperCase() });

    console.log('2. team found?', team ? 'yes' : 'no');


    if (!team) {
        const error = new Error('Invalid Join Code');
        error.statusCode = 404;
        throw error;
    }

    if (team.isArchived) {
        const error = new Error('This team is archived');
        error.statusCode = 400;
        throw error;
    }

    const existingMemberShip = await TeamMember.findOne(
        {
            userId,
            teamId: team._id
        });

    console.log('3. existing membership?', existingMemberShip ? 'yes' : 'no');


    // double layer 
    if (existingMemberShip) {
        const error = new Error("You are already a member of this team");
        error.statusCode = 409;
        throw error;
    }



    // race condition error
    try {
        await TeamMember.create({
            userId,
            teamId: team._id,
            workspaceId: team.workspaceId,
            role: 'member'
        });

    }
    catch (err) {
        if (err.code === 11000) {
            const error = new Error('You are already a member of this team');
            error.statusCode = 409;
            throw error;
        }

        throw err;
    }

console.log('4. membership created');

    return {
        id: team._id,
        name: team.name
    }

    
}


module.exports = { createTeam, joinTeam };