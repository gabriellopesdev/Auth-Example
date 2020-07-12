import { User } from '../../model/user'
import { Request, Response } from 'express'

class UserController {
    async createUser(request: Request, response: Response) {
        const { name, login, pass } = request.body
        const user = new User(name, login, pass)
        const createduser = await user.create()
        return response.status(201).json(createduser);   
    }

    async listUsers(request: Request, response: Response){
        const user = new User()
        const listedUsers = await user.index()
        return response.json(listedUsers);          
    }

    async deleteUser(request: Request, response: Response){
        const user = new User()
        const { id } = request.params;
        await user.delete(Number(id))
        return response.json('User deleted'); 
    }

    async userLogin(request: Request, response: Response){
        const { login, pass } = request.body
        const user = new User()
        if (await user.searchByLogin(login)){
            if (await user.validatePassword(pass)) {
                return response.json('Login succeed') 
            }
            else {
                return response.json('Password invalid') 
            }
        }
        else {
            return response.json('User invalid')
        }
    }
}

export default UserController
