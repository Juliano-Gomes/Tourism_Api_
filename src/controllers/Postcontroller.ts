import { FastifyReply, FastifyRequest } from "fastify";
import fs from 'fs'
import path from "path";
import {z} from 'zod'
import { get_A_array_Of_Countries } from "../utils/db_posts_actions_functions/Get_Action";
import { Create_a_new_field } from "../utils/db_posts_actions_functions/Post_action";
import { delete_A_info_in_data } from "../utils/db_posts_actions_functions/Delete_Action";
import { update_A_Field_in_data } from "../utils/db_posts_actions_functions/Put_Action";

type req={
    photo:[{
        size:number,
        type:string,
        name:string,
        lastModified:number
    }],
    name:string,
    description:string,
    country:string,
    email:string
}
let id = 10;
export const PostHandler = async (request: FastifyRequest,response:FastifyReply):Promise<req>=>{
    try {
        //const {photo,country,description,email,name} = await request.body as req
        const data = await request.formData()
        //const file =data.get("photo")
        const files =(request.body as any).photo
        const name = data.get("name") as string
        const desc = data.get("description") as string
        const country = data.get("country") as string
        const email = data.get("email") as string

        if(name != "" || email != "" || !files || desc != "" || country != ""){
            if(files.type == "file"){
                const { filename,toBuffer} = files;
                const fileImage =`${new Date().getMinutes()}-${new Date().getSeconds()}-${filename}`
                const newFile = path.join(__dirname,"..", "cities", fileImage);
                //console.log()
                try {
                    id += 1
                    const bf = await files.toBuffer()
                    const writeStream = fs.writeFileSync(newFile,bf);

                    const seeker = new Create_a_new_field()
                    const data = {
                        id:id.toString(),
                        name:name.toLowerCase(),
                        author:email,
                        description:desc,
                        country:country.toLowerCase(),
                        image:fileImage,
                    }
                    const res =await  seeker.add_data_to_db(data)
                    if (res.status) {                        
                        return await response.code(201).send({
                            message: res.message,
                        })
                    } else {    
                        return await response.code(400).send({
                            message: res.message,
                        })
                    }

                } catch (error) {
                    return await response.code(406).send({
                        error:true,
                        message: "unacceptable data,country wasn't saved",
                    })
                }
            }else{
                return await response.code(406).send({
                    error:true,
                    message: "unacceptable data,country wasn't saved",
                })
            }
        }
        return response.code(400).send({
            message: 'invalid data, fill all fields,thanks',
        })
    } catch (error) {
        console.log(error)
        return await response.code(500).send({
            error:true,
            message: 'an error occurred when our server tried to save and broadcast your photo',
        })
    }
}

export const SearchHandler = async(request: FastifyRequest,response:FastifyReply)=>{
    const validator = z.object({
        city:z.string(),
        Limit:z.string(),
    })
    try {
        const {city,Limit} = validator.parse(request.params)
        
        if(city.trim() != " " && city.length > 2){
            const DATA = new get_A_array_Of_Countries();
            const places=await  DATA.get_From_database(city,parseInt(Limit)) 

            if (places.status) {
                return await response.code(200).send({
                    message:places.data,
                    code:'Ok'
                })
            } else {
                return await response.code(400).send({
                    message:"your requests didn't return any result ,try on a different city",
                    code:'Ok'
                })
            }
        }else{
            return response.code(406).send({
                error:true,
                message: "invalid city name",
            })
        }
    } catch (error) {
        return response.code(500).send({
            error:true,
            message: 'an error occurred when our server tried to search for your destine place',
        })
    }
}

export const DeleteHandler = async(request:FastifyRequest,response:FastifyReply)=>{
    const idValidator = z.object({
        id:z.string()
    })
    try {
        const {id} = idValidator.parse(request.params)
        if (id.trim() != "" && id.length > 0) {
            const Data = new delete_A_info_in_data()
            const res = await Data.delete_data_in_db(id)

            if(res.status){
                return await response.code(200).send({
                    message:res.message,
                })
            }else{
                return await response.code(400).send({
                    message:res.message
                })
            }
        } else {
            return response.code(406).send({
                error:true,
                message: "invalid data",
            })
        }
    } catch (error) {
        return response.code(500).send({
            error:true,
            message: 'an error occurred when our server tried to delete your place',
        })
    }
}

export const putUpdate = async(request:FastifyRequest,response:FastifyReply)=>{
    const param_validator = z.object({id:z.string()})
    const Body_validator = z.object({description:z.string()})

    try {
        const {id} = param_validator.parse(request.params)
        const {description} = Body_validator.parse(request.body)

        if(id.length > 0 && description.length > 0){
            const dta = new update_A_Field_in_data()
            const fields ={id,description}
            const res = await dta.update_field_from_database(fields)

            if (res.status) {
                return response.code(200).send({
                    message: res.message
                })
            } else {
                return response.code(400).send({
                    error:true,
                    message:res.message
                })
            }
        }else{
            return response.code(406).send({
                error:true,
                message: "invalid data",
            })
        }
    } catch (error) {
        return response.code(500).send({
            error:true,
            message: 'an error occurred when our server tried to update your place',
        })
    }
}