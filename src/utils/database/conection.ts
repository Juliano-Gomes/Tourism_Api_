import {Pool} from 'pg'

export const db_connector = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASS,
    port: 5432,
})