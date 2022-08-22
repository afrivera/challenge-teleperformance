const { Router } = require('express')

// routes



const router = Router();


router.get('/', (req, res)=> {return res.json({hola: 'hola'})})


module.exports = router;