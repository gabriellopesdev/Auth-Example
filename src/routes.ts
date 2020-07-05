import express from 'express'
import UserController from './controller/user/'

const router = express.Router()

const userController = new UserController

router.get('/user', userController.listUsers)

export default router