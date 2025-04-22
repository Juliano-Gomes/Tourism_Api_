import {FastifyRequest,FastifyReply} from 'fastify'
import {z} from 'zod'
import { AddUserTo_Database, Log_in_checker } from '../utils/user/Post_user_action'
import { DB_Queries } from '../utils/database/table.pg'

const log_validator=z.object({
    email:z.string().email(),
    password:z.string().min(8)
})

const user_validator = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    country:z.string()
})

export const userHandler = async (request:FastifyRequest,response:FastifyReply)=>{

    try {
        const {country,email,name,password} = user_validator.parse(request.body)
        
        if(country.length > 0 && email.length > 0 && email.includes("@") && name.length > 2 && password.length >= 8){
            const data =new AddUserTo_Database()
            const res = await data.addDATABASE({
                    name,
                    password,
                    email,
                    country
            })
            if(res.status){
                return response.code(201).send({
                    message: res.message,
                    success:true
                })
            }else{
                return response.code(400).send({
                    message: res.message,
                    error:true
                })
            }
        }else{
            response.code(406).send({message:"an invalid data or empty field was found in your request"})
        }
    } catch (error) {
        return response.code(500).send({
            error:true,
            message:"an occurred when the server tried to create your account"
        })
    }
}

export const logInHandler =async(request:FastifyRequest,response:FastifyReply)=>{
    try {
        const {email,password} = log_validator.parse(request.body)
        if (email.includes("@") && email.length > 7 && password.length >= 8 && !password.includes("'1' OR 1 == 1") && !password.includes("JOIN") && !password.includes("SELECT") && !password.includes("UPDATE") && !password.includes("DELETE") && !password.includes("*")) {
            const check = new Log_in_checker()
            const res = await check.Compare_pass_db({plan:password,email})
            if (res.status) {
                return response.code(200).send({
                    message: res.message,
                    logged:true,
                    data:res.data
                })
            } else {
                return response.code(400).send({
                    message: res.message,
                    error: true,
                })
            }
        } else {
            return response.code(406).send({
                message: "an invalid data or empty field was found in your request",
                error: true
            })
        }
    } catch (error) {
        return response.code(500).send({
            error:true,
            message:"an error occurred when the server tried to log you in"
        })
    }
}

export const Delete_account=async(request:FastifyRequest,response:FastifyReply)=>{
    const delete_checker= z.object({
        id:z.string()
    })
    try {
        const {id} = delete_checker.parse(request.params)

        if (id.trim() != " "  && id.length > 7 ) {
            const db =new DB_Queries()
            const res = await db.DELETE(id)

            if (res.deleted) {
                return response.code(200).send({
                    message: res.message,
                    deleted:res.deleted,
                    success:true
                })
            } else {
                return response.code(400).send({
                    message:res.message,
                    deleted:res.deleted,
                    error:true
                })
            }
        } else {
            return response.code(406).send({
                message:"we couldn't delete the account cause we got an  invalid or empty id",
                deleted:false,
                error:true
            })
        }
        
    } catch (error) {
        return response.code(500).send({
            message:"we couldn't delete the account cause we got an error",
            deleted:false,
            error:true
        })
    }
}

export const getContent=async(request:FastifyRequest,response:FastifyReply)=>{
    const parValidate = z.object({
        limit:z.string()
    })
    try {
        const {limit} = parValidate.parse(request.params)
        const db = new DB_Queries()
        const rs = await db.NEW(parseInt(limit))
        if (rs.status) {
            return response.code(200).send({
                data:rs.data,
                success:rs.status,
                message:"data received :)"
            })
        } else {
            return response.code(400).send({
                error:rs.status,
                message:"our db has no data yet :("
            })
        }
    } catch (error) {
        return response.code(500).send({
            message:"No data found :("
        })
    }
}