import knex from '../../database/connection'
import bcrypt from 'bcrypt'

class User {

    name: string
    login: string
    pass: string

    constructor(name?: string, login?: string, pass?: string) {
        this.name = name || '' 
        this.login = login || ''
        this.pass = pass || ''
    }
    async delete(id: Number) {
        if (id === 1) {
            return
        }
        const user = await knex('users').where('id', id).del()        
    }
    async create(){
        const trx = await knex.transaction()        
        this.pass = await bcrypt.hash(this.pass, 10)  
        const insertedId = await trx('users').insert(this)
        const userId = insertedId[0]            
        trx.commit()
        return {
           id: userId, 
           name: this.name,
           login: this.login,
        }
    }

    async validatePassword(pass: string) {
        if (!pass) {
            throw new Error('Invalid password');
        }
        if (!this.pass) {
            throw new Error('Object password cannot be empty');
        } 

        const match = await bcrypt.compare(pass, this.pass);
        if (match) {
            return true
        }
        else {
            return false
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
        .select('users.id','users.name', 'users.login')
        .whereNot('users.login', 'admin')
        return users     
    }
}

export { User }