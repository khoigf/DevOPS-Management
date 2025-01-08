const express = require('express');
const { register, login, logout, changePassword } = require('../controllers/authController');
const router = express.Router();
const {authenticate} = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.post('/change-password',authenticate, changePassword);

module.exports = router;
