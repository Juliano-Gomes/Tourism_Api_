import { randomUUID } from "crypto"
import {hash,genSalt,compare} from 'bcrypt'
import { user_db } from "../usersList"
import { DB_Queries } from "../database/table.pg"
type dt={name:string,password:string,email:string,country:string}

export class AddUserTo_Database {
    //constructor(parameters) {}
    public async addArray(data:dt){
        try {
            const newPass = await this.hashPass(data.password)
            const id = randomUUID()
            
            if (newPass.status) {
                    const unique = user_db.filter(e=>{
                        return e.email === data.email
                    })
                    if(unique.length == 0){
                        user_db.push({
                            id:id,
                            name:data.name,
                            password:newPass.data!,
                            email:data.email,
                            country:data.country,
                            token:`${data.email}/${data.name}`
                        })
                        return {
                            status:true,
                            message:"User Added Successfully",
                        }
                    }else{
                        return {
                            status:false,
                            message:"User not Added Successfully, try another email. this is an existent email.",
                        }
                    }
            } else {
                return{
                    status:false,
                    message:"an error :("
                }
            }
        } catch (error) {
            return {
                status: false,
                message: "an error took place ,while saving data in db"
            }
        }
    }

    private async hashPass(text:string){
        try {
            const salt =  12
            const gen = await genSalt(salt,"b")
            const pass =await hash(text,gen)
           
            return {
                data:pass,
                status:true
            }
           
        } catch (error) {
            return {
                status: false,
                error:error
            }
        }
    }

    public async addDATABASE(data:dt){
        type DT ={
            status :Boolean,
            data:dt[]
        }
        try {
            const newPass = await this.hashPass(data.password)
            const id = randomUUID()

            if (newPass.status) {
                const newData = new DB_Queries()
                await newData.Table()
                const unique = await newData.Log_in_USER({email:data.email}) as DT
                if(unique.data.length == 0){
                    await newData.REGISTER_USER({                            
                        id:id,
                        name:data.name,
                        password:newPass.data!,
                        email:data.email,
                        country:data.country,
                        token:`${data.email}/${data.name}`
                    })
                    
                    return {
                        status:true,
                        message:"User Added Successfully",
                    }
                }else{
                    return {
                        status:false,
                        message:"User not Added Successfully, try another email. this is an existent email.",
                    }
                }
        } else {
            return{
                status:false,
                message:"an error :("
            }
        }
        } catch (error) {
            return {
                status: false,
                message: "an error took place ,while saving data in db"
            }
        }
    }
}

export class Log_in_checker {
    //constructor(parameters) {}
    public async Compare_pass_array(data:{plan:string,email:string}){
        try {
            const user =user_db.filter(e=>{return e.email == data.email})
            if(user.length == 1){
                const res = await compare(data.plan,user[0].password)
                if (res) {
                    return {
                        status: true,
                        message: "you are logged successfully",
                        data:{
                            name:user[0].name,
                            email:user[0].email,
                            country:user[0].country,
                            id:user[0].id
                        }
                    }
                } else {
                   return {
                    status: false,
                    message: "email or password is wrong ,please check it out 1"
                   } 
                }
            }else {
                return {
                 status: false,
                 message: "email or password is wrong ,please check it out 2"
                } 
             }
        } catch (error) {
            return {
                status: false,
                message:"an error occurred"
            }
        }
    }
    public async Compare_pass_db(data:{plan:string,email:string}){
        try {
            const db = new DB_Queries()
            const user = await db.Log_in_USER({email:data.email})
            
            if(user.data?.length == 1){
                const res = await compare(data.plan,user.data?.[0].passwd)
               
                if (res) {
                    return {
                        status: true,
                        message: "you are logged successfully",
                        data:{
                            name:user.data[0].name,
                            email:user.data[0].email,
                            country:user.data[0].country,
                            id:user.data[0].id
                        }
                    }
                } else {
                   return {
                    status: false,
                    message: "email or password is wrong ,please check it out 1"
                   } 
                }
            }else {
                return {
                 status: false,
                 message: "email or password is wrong ,please check it out 2"
                } 
             }
        } catch (error) {
            return {
                status: false,
                message:"an error occurred :("
            }
        }
    }
}