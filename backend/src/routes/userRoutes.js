const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

router.post('/users', authenticate, authorizeAdmin, userController.addUser);
router.put('/users/:user_id', authenticate, authorizeAdmin, userController.updateUser);
router.get('/users', authenticate, authorizeAdmin, userController.getUsers);
router.delete('/users/:user_id', authenticate, authorizeAdmin, userController.deleteUser);

module.exports = router;