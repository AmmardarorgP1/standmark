const express = require('express');
const teamController = require('../controllers/teamController');
const {protect} = require('../middleware/authMiddleware');


const router = express.Router();




router.post('/',protect,teamController.createTeam);
router.post('/join',protect,teamController.joinTeam);


module.exports = router;