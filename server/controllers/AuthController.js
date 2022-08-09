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
      const likedFoodsData = []
      const favoriteCities = []
      const user = new User({ userName,userAge,userGender,userCity,email,password:hashPassword,roles:[userRole.value],likedFoodsData,favoriteCities })
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
      return res.json({
        _id:user._id,
        userName:user.userName,
        userCity:user.userCity,
        userGender:user.userGender,
        userAge:user.userAge,
        email:user.email,
        role:user.roles[0],
        likedFoodsData:user.likedFoodsData,
        favoriteCities:user.favoriteCities,
        token})
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
  async likeFood(req, res) {
    try{
      const recipe = req.body.recipe
      const recipeId = recipe.recipeId
      const userId= req.body.userId
      const user = await User.findById(userId);
      const check = user.likedFoodsData.map((item) => item.recipeId).includes(recipeId)
      if (!check) user.likedFoodsData.push(recipe);
      else user.likedFoodsData = user.likedFoodsData.filter(item => item.recipeId !== recipeId);
      const updatedUser = await User.findByIdAndUpdate(user._id,user,{new:true})
      return res.status(200).json(updatedUser)
    } catch(e){
      res.status(500).json(e)
    }
  }
  async changeFavoriteCity(req, res) {
    try{
      const city = req.body.city
      const userId = req.body.userId
      const user = await User.findById(userId);
      const check = user.favoriteCities.includes(city);
      if (!check) user.favoriteCities.push(city);
      else user.favoriteCities = user.favoriteCities.filter(item => item !== city);
      const updatedUser = await User.findByIdAndUpdate(user._id,user,{new:true})
      return res.status(200).json(updatedUser)
    } catch(e){
      res.status(500).json(e)
    }
  }

}

export default new AuthController();