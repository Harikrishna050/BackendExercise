const express = require('express')
const router = express.Router()

const {registerUser,LoginUser} =require('../controllers/userControllers');
const {protect} =require('../middleware/authMiddleware');

router.post('/',registerUser);
router.post('/login',LoginUser);

module.exports = router
