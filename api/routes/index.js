const { Router } = require('express')

// routes
const userRouter = require('./users');
const authRouter = require('./auth')
const postRouter = require('./posts')


const router = Router();


router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);


module.exports = router;