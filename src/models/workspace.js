const mongoose = require('mongoose');




const workspaceScheme = new mongoose.Schema({


    name:
    {
        type: String,
        required: true,
        trim: true
    },

    slug:
    {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true


    },

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},
{ timestamps: true }
);


const Workspace = mongoose.model('Workspace',workspaceScheme);

module.exports = Workspace;