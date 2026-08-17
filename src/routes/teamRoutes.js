const express = require('express');
const teamController = require('../controllers/teamController');
const {protect} = require('../middleware/authMiddleware');


const router = express.Router();




router.post('/',protect,teamController.createTeam);


module.exports = router;