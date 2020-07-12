import knex from '../../database/connection'

interface  iUser {
    name: string
    login: String
    pass: String


}

class User {

    name: string
    login: String
    pass: String

    constructor(name?: string, login?: String, pass?: String) {
        this.name = name || '' 
        this.login = login || ''
        this.pass = pass || ''
    }
    async delete(id: Number) {
        const user = await knex('users').where('id', id).del()        
    }
    async create(){
        const trx = await knex.transaction()
        const insertedId = await trx('users').insert(this)
        const userId = insertedId[0]            
        trx.commit()
        return {
           id: userId, 
           ...this,
        }
    }

    async searchByLogin(login: string){
        const users = await knex('users')   
        .select('users.name', 'users.login', 'users.pass')
        .where('users.login', login)
        .whereNot('users.login', 'admin')
        if (!users.length) {
            return false
        }
        else {
            this.login = users[0].login
            this.name = users[0].name
            this.pass = users[0].pass
            return true 
        }
        
    }    

    async index(){
        const users = await knex('users')   
        .select('users.name', 'users.login')
        .whereNot('users.login', 'admin')
        return users     
    }
}

export {User, iUser}