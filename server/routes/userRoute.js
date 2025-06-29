import express from 'express'
import { isAuth, login, Logout, register } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()


userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/is-auth',authUser,isAuth)
userRouter.get('/logout',authUser,Logout)

export default userRouter;