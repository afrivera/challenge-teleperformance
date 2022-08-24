const { Router } = require('express');

// controllers
const { getAll, getById, put, destroy } = require('../controllers/users');
const { validateJWT, isOwnerOrAdminRole } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { idUser } = require('../schemas/user');

// routes



const router = Router();


router.get('/', getAll)
router.get('/:id', [
    validateJWT,
    schemaValidator( idUser)
], getById)
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