const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const {secret} = require("../config")


function generateAccessToken(id, roles) {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {expiresIn: "24h"});
}
class UserController {
  async get(req, res) {
    try {
      res.json(await User.find());
      
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Get error'})
    }
  }

  async getById(req, res) {
    try {
      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`});
      }
      res.json(await User.findById(req.params.id));      
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Get error'})
    }
  }

  async put(req, res) {
    try {
      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`});
      }
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.json({state: 'updated'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Update error'})
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`});
      }
      await User.findByIdAndDelete(req.params.id);
      res.json({state: 'deleted'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Delete error'})
    }
  }

  async login(req, res) {
    try {
      const {username,password} = req.body;
      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: `Введен не верный пароль`});
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.send(token);

    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Login error'})
    }
  }
  async registration(req, res) {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибки при регистрации", errors})
      }

      const {username,password, firstName, lastName} = req.body;
      //создаем кандидата
      const candidate = await User.findOne({username})
      // проверяем если кандидат в бд, если есть, то возвращаем ошибку
      if (candidate) {
        return res.status(400).json({message:"Пользователь с таким именем уже уществует"})
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value: 'user'})
      const user = new User({
        username,
        password: hashPassword, 
        roles:[userRole.value],
        firstName,
        lastName
      });
      await user.save();
      return res.json({message: "Пользователь успешно зарегестрирован"});

    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Registation error'})
    }
  }
  async checkTocken(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({message: "Пользователь не авторизован"})
      }
      const decodedData = jwt.verify(token, secret);
      req.user = decodedData
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({message: "Пользователь не авторизован"})
    }
  }
}

module.exports = new UserController();