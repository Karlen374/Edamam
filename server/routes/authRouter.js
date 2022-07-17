import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { check } from "express-validator";
import AuthMiddleware from "../middlewares/authMiddleware.js"; 
import RoleMiddleware from "../middlewares/roleMiddleware.js";

const authRouter = new Router()

authRouter.post('/signUp',[
  check('email',"Такой почты не существует").isEmail(),
  check('password',"Пароль должен быть больше 4 символов").isLength({min:4}),
], AuthController.registration)
authRouter.post('/signIn', AuthController.login)
authRouter.get('/users',RoleMiddleware(["ADMIN"]), AuthController.getUsers)
authRouter.get('/users/:id',AuthController.getOneUser)


export default authRouter;