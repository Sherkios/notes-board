const User = require('../models/User');
const Role = require('../models/Role');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const { secret } = require("../config")


async function generateAccessToken(id, roles, firstName, lastName, email) {
  const payload = {
    id,
    roles: await getRoles(roles),
    firstName,
    lastName,
    email
  }

  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

async function getRoles(roles) {
  const mass = [];

  if (roles) {
    try {
      for (const role of roles) {
        mass.push((await Role.findById(role)).value)
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  return mass  
}

async function getIdRoleByValue(value) {
  if (value == "Администратор") {
    return "65f00c5fdb779b5a865b4465"
  } else {
    return "65f00c5fdb779b5a865b4464"
  }
}

async function includeRoleById(roleId, roles) {
  let isExist = false;
  roles.forEach(objectRole => {
  if ((typeof objectRole == "object") && objectRole !== null) {
    console.log(objectRole, roleId)
    if (objectRole.hasOwnProperty("_id")) {
      if (objectRole._id == roleId) {
        isExist = true;
      }
    }
      if (objectRole == roleId) {
        isExist = true;
      }
    }
  });

  return isExist;
}



class UserController {
  async get(req, res) {
    try {
      const users = await User.find({}, '-password -username').populate('roles');
      res.json(users);

    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Get error' })
    }
  }

  async getById(req, res) {
    try {
      // const { username, password } = req.body;
      // const user = await User.findOne({ username })
      // if (!user) {
      //   return res.status(400).json({ message: `Пользователь ${username} не найден` });
      // }
      const user = await User.findById(req.params.id).populate('roles');
      if (!user) {
        return res.status(400).json({ message: `Пользователь c id: ${req.params.id} не найден` });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Пользователь не найден' })
    }
  }

  async put(req, res) {
    try {
      const {_id} = req.body;
      const outUser = {...req.body};
      const valueRole = req.body?.optionsRole.current;
      const optionRole = await Role.findById(await getIdRoleByValue(valueRole));
      const user = await User.findOne({ _id });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      // console.log(outUser);
      if (valueRole == "Администратор") {
        console.log((await includeRoleById(optionRole, user.roles)));
        if (!(await includeRoleById(optionRole, user.roles))) {
          outUser.roles.push(await Role.findById(optionRole));
        };
        // await User.findByIdAndUpdate(req.params.id, outUser);
      } else {
        await User.findByIdAndUpdate(req.params.id, {...outUser, $pull: {optionRole}});

      }

      // console.log(outUser);
      res.json({ state: 'updated' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Update error' })
    }
  }

  async delete(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      await User.findByIdAndDelete(req.params.id);
      res.json({ state: 'deleted' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Delete error' })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен не верный пароль` });
      }
      
      const token = await generateAccessToken(
        user._id,
        user.roles,
        user.firstName,
        user.lastName,
        user.email
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });

      const decodedData = jwt.verify(token, secret);
      return res.json(decodedData);

    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Login error' })
    }
  }

  async logout(req,res) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });
      return res.send();
    } catch (error) {
      
    }
  }
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибки при регистрации", errors })
      }

      const { username, password, firstName, lastName } = req.body;
      //создаем кандидата
      const candidate = await User.findOne({ username })
      // проверяем если кандидат в бд, если есть, то возвращаем ошибку
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким именем уже уществует" })
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'user' })
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole],
        firstName,
        lastName
      });
      await user.save();
      return res.json({ message: "Пользователь успешно зарегестрирован" });

    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Registation error' })
    }
  }
  async checkToken(req, res) {
    try {
      const token = req.cookies.token
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }
      const decodedData = jwt.verify(token, secret);
      res.json(decodedData);
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
  }

  
}

module.exports = new UserController();