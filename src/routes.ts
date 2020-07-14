import express from 'express'
import UserController from './controller/user/'
import Auth from './middleware/jwt'
import * as dotenv from 'dotenv'

const router = express.Router()

dotenv.config() 

const auth = new Auth

const userController = new UserController

router.get('/user', auth.ValidateToken, userController.listUsers)

router.post('/user', userController.createUser)

router.delete('/user/:id', auth.ValidateToken, userController.deleteUser)

router.post('/login', userController.userLogin)

export default router