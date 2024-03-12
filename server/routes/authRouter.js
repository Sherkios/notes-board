const express = require('express');
const router = express.Router();
const controller = require('../controller/authController')
const {check} = require("express-validator")

router.post('/registration', [
  check('username', "Логин пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max: 10}),
  check('firstName', "Имя пользователя не может быть пустым").notEmpty(),
  check('lastName', "Имя пользователя не может быть пустым").notEmpty(),
], controller.registration);
router.get('/login', controller.login);
module.exports = router;