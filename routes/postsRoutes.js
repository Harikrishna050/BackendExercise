const express = require('express')
const router = express.Router()
const {getposts,postposts,updateposts,delposts,getlatestposts}=require('../controllers/postsControllers');


const {protect}=require('../middleware/authMiddleware')
router.route('/').get(protect,getposts).post(protect,postposts);
router.route('/:id').put(protect,updateposts).delete(protect,delposts);
router.route('/latest').get(protect,getlatestposts);
module.exports = router