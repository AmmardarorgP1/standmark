const Workspace = require('../models/Workspace');



const createWorkspace = async ({ name, ownerId }) => {
    const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');


    const exisiting = await Workspace.findOne({ slug });
    if (exisiting) {
        const error = new Error('A workspace with this name already exists');
        error.stausCode = 409;
        throw error;

    }


    const workspace = await Workspace.create({ name, slug, ownerId });


    return {
        id: workspace._id,
        name: workspace.name,
        slug: workspace.slug
    };
};


module.exports = { createWorkspace };