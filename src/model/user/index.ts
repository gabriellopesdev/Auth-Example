import knex from '../../database/connection'
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
    async index(){
        const users = await knex('users')   
        .select('users.name', 'users.login')
        return users     
    }
}

export default User