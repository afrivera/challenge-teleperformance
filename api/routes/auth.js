const { Router } = require('express');
const { login, post } = require('../controllers/users');
const { schemaValidator } = require('../middlewares/validator');
const { user } = require('../schemas/user');

const router = Router();

router.post('/login', login );
router.post('/', schemaValidator( user ), post)


module.exports = router;