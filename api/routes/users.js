const { Router } = require('express');

// controllers
const { post, getAll, getById, put, destroy } = require('../controllers/users');
const { schemaValidator } = require('../middlewares/validator');
const { user } = require('../schemas/user');

// routes



const router = Router();


router.get('/', getAll)
router.get('/:id', getById)
router.post('/', schemaValidator( user ), post)
router.put('/:id', put)
router.delete('/:id', destroy)


module.exports = router;