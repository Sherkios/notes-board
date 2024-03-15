const jwt = require('jsonwebtoken');
const {secret} = require("../config");
module.exports = function (req,res, next) {
  if(req.method === "OPTIONS") {
    next()
  }

  try {
    const id = String(req.params.id);
    if (id == "65f175bacb930dcc31cc79f3" || id == "65f159e53e46d79c7fd24478") {
      return res.status(405).json({message: "В целях демонстрации ситсемы нельзя манипулировать данным пользователем"})
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "Ошибка в получение id"})
  }
};