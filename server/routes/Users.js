const express = require('express');
const router = express.Router();
const {check} = require("express-validator")
const controller = require('../controller/usersController')
const authMiddleware = require('../Middleware/authMiddleware')
const roleMiddleware = require('../Middleware/roleMiddleware')

router.post('/registration', [
  check('username', "Логин пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max: 10}),
  check('firstName', "Имя пользователя не может быть пустым").notEmpty(),
  check('lastName', "Имя пользователя не может быть пустым").notEmpty(),
], controller.registration);

router.post('/login', controller.login);

router.get('/', controller.get);

router.get('/:id', controller.getById);

router.put('/:id', controller.put);

router.delete('/:id', controller.delete);
router.post('/checkToken', controller.checkTocken);




module.exports = router;