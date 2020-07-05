import express from 'express'
import UserController from './controller/user/'

const router = express.Router()

const userController = new UserController

router.get('/user', userController.listUsers)

router.post('/user', userController.createUser)

router.delete('/user/:id', userController.deleteUser)

export default router