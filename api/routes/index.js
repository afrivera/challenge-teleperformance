const { Router } = require('express')

// routes
const userRouter = require('./users');
const authRouter = require('./auth')


const router = Router();


router.use('/users', userRouter);
router.use('/auth', authRouter);


module.exports = router;