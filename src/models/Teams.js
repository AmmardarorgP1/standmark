const mongoose = require('mongoose');



const teamSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },

    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    createdBy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    joinCode: {
        type: String,
        unique: true,
        trim: true,
        uppercase: true,
        required: true,
    },
    isArchived: {
        type: Boolean,
        default: false
    }



},

    { timestamps: true }
);


teamSchema.index({workspaceId:1});

const Team = mongoose.model('Team',teamSchema);

module.exports = Team;  