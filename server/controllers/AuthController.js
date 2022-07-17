import User from "../models/user.js";
import Role from "../models/role.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import  config  from "../config.js";

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, config.secret,{expiresIn: "24h"})
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json({message:"Ошибка при регистрации ", errors})
      }
      const {userName, userAge, userGender, userCity, email, password} = req.body
      console.log(req.body);
      const candidate =await User.findOne({email})
      if (candidate) {
        return res.status(400).json({message: "Пользователь с таким Email-ом уже существует"})
      }
      const hashPassword = bcrypt.hashSync(password,7)
      const userRole = await Role.findOne({value:"USER"})
      const user = new User({ userName,userAge,userGender,userCity,email,password:hashPassword,roles:[userRole.value] })
      await user.save()
      return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Registration Error"});
    } 
  }
  async login(req, res) {
    try {
      const {email,password} = req.body
      const user = await User.findOne({email})
      if (!user) {
        return res.status(400).json({message:`Пользователь ${email} не найден `})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: 'Введен неверный пароль'})
      }
      const token = generateAccessToken(user._id, user.roles)
      const avatar = user.avatar ? user.avatar : null
      return res.json({_id:user._id,userName:user.userName,email:user.email,role:user.roles[0],token,avatar})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Login Error"});
    }
  }
  async getOneUser (req,res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({message: 'Id не указан'})
      }
      const user = await User.findById(id);
      return res.json(user)
    } catch (e){
      res.status(500).json(e)
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      
    }
  }

}

export default new AuthController();