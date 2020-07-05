import Knex from 'knex'

export async function seed(knex: Knex){
    await knex('users').insert([
        {name: 'Administrator', login: 'admin', pass: 'admin'}       
    ])
}