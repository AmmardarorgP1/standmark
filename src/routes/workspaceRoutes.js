const express = require('express');

const workspaceController = require('../controllers/workspaceController');

const {protect} = require('../middleware/authMiddleware');



const router = express.Router();



router.post('/',protect,workspaceController.createWorkspace);

module.exports = router ;


