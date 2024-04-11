const express = require('express')
const router = express.Router()

const {registerUser,LoginUser,getMe,getweb} =require('../controllers/userControllers');
const {protect} =require('../middleware/authMiddleware');

router.get('/',getweb);
router.post('/',registerUser);
router.post('/login',LoginUser);

router.get('/me',protect,getMe);

module.exports = router
