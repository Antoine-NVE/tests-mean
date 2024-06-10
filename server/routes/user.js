const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/authenticated', userController.authenticated);
// router.get('/informations');

module.exports = router;
