const { Router } = require('express');

// controllers
const { getAll, getById, put, destroy, post, postComment, likeOrUnlikePost } = require('../controllers/posts');
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

router.post('/comments/:id',[
    validateJWT,
    schemaValidator( idUser)
], postComment)
router.post('/likes/:id',[
    validateJWT,
    schemaValidator( idUser)
], likeOrUnlikePost)


module.exports = router;