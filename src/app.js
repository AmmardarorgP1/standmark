const express = require('express');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const workspaceRoutes = require('./routes/workspaceRoutes');
const teamRoutes = require('./routes/teamRoutes');



const app = express();


app.use(express.json());


app.get('/',(req,res)=>{
         res.send("API StandMark is running ");
});




app.use('/auth',authRoutes);
app.use('/workspaces',workspaceRoutes);
app.use('/teams',teamRoutes);


app.use(errorHandler);

module.exports = app;