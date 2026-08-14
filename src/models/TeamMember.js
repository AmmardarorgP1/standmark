const mongoose = require('mongoose');



const teamMemberSchema = new mongoose.Schema({



    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,

    },

    teamId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Team',
        required:true,
    },

    workspaceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Workspace',
        required:true
    },

    role:{
        type:String,
        enum:['member','manager'],
        default:'member',
        requried:true,
    },
    
    joinedAt:{
        type:Date,
        default: Date.now,
    }

},
{timestamps:true});


teamMemberSchema.index({userId:1,teamId:1},{unique:true} );
teamMemberSchema.index({teamId:1});

const TeamMember = mongoose.model('TeamMember',teamMemberSchema);

module.exports =  TeamMember;