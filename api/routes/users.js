const { Router } = require('express');

// controllers
const { post, getAll, getById, put, destroy } = require('../controllers/users');

// routes



const router = Router();


router.get('/', getAll)
router.get('/:id', getById)
router.post('/', post)
router.put('/:id', put)
router.delete('/:id', destroy)


module.exports = router;