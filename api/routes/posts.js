const { Router } = require('express');

// controllers
const { getAll, getById, put, destroy, post } = require('../controllers/posts');
const { validateJWT, isOwnerOrAdminRole } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { idUser } = require('../schemas/user');

// routes



const router = Router();


router.get('/', getAll)

router.get('/:id', [
    validateJWT,
    schemaValidator( idUser),
    isOwnerOrAdminRole
], getById)

router.post('/', validateJWT, post)

router.put('/:id', [
    validateJWT,
    schemaValidator( idUser),
    isOwnerOrAdminRole
], put)

router.delete('/:id',[
    validateJWT,
    schemaValidator( idUser),
    isOwnerOrAdminRole
], destroy)


module.exports = router;