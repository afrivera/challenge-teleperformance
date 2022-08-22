const { Router } = require('express')

// routes
const userRouter = require('./users');


const router = Router();


router.use('/users', userRouter);


module.exports = router;