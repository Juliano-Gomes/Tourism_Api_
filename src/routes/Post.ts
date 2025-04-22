import { DeleteHandler, PostHandler, putUpdate, SearchHandler } from "../controllers/Postcontroller";
import { FastifyInsType } from "../utils/types";
import {z} from 'zod'

export const bd=z.object({
    name:z.string().describe("the username that post the photo").default("john Doe"),
    email:z.string().describe("the name of the user that posted the photo").default("johndoe007@gmail.com"),
    photo:z.object({}).describe("the photo that gonna be published").default({ name : 'LuandaCity.png' , size: '117 mb', data :` ${new Date().getHours()}H:${new Date().getMinutes()}mm` }),
    description:z.string().describe("a user Post , showing the country that he has visit").default("this is a picture of a african country named Angola, the city is called Luanda , is very beautiful a highly recommend you to visit , you will not be disappointed"),
    country:z.string().describe("the name of the visited country and his city").default("Africa Angola,Luanda")
})

const rs =z.object({
    201:z.object({
        success:z.boolean().describe("true: your request was saved in the database and broadcasted to other users."),
        message:z.string().describe("your photo was uploaded and broadcasted to all connected users in our server, thanks for helping the tourism and the culture")
    }),
    400:z.object({
        error:z.boolean().describe("true : this is a 400 http status code , what means bad request"),
        message:z.string().describe("the request was not saved in the database because the data was invalid, check that out")
    }),
    406:z.object({
        error:z.boolean().describe("true: an error occurred with your request"),
        message:z.string().describe("this response is a not acceptable request, this means that one of the data that you sent us is invalid or none ")
    }),
    500:z.object({
        error:z.boolean().describe("true: an error occurred with your request"),
        message:z.string().describe("an error occurred when our server tried to save and broadcast your photo")
    })
})
const putBody = z.object({
    description:z.string()
})
const param = z.object({
    city:z.string(),
    Limit:z.string(),
    //Offset:z.number().optional()
})
const deleteParam = z.object({
    id:z.string()
})
export const Post = async(app:FastifyInsType)=>{
    app.post("/new",{
        schema:{
            tags:["Publish a photo"],
            summary:"a route that create post in database",
            description:"a post route to create a post in database , when it finish his work broadcast the post to all users , allowing them to comment and like the picture",
            
            //body:bd,
            Response:rs
        },
        handler:PostHandler
    })
}
//[FILE:postHandler.ts](file "postHandler.ts")
export const Search = async(app:FastifyInsType)=>{
            app.get("/:city/:Limit",{
                schema:{
                    tags:["A specific place or country"],
                    summary:"a route that search areas , places and city in database",
                    description:"return an array with all related data about the searched place",
                    
                    //body:z.object({}),
                    params:param,
                    Response:rs
                },
                handler:SearchHandler
            })
}

//[FILE:searchHandler.ts](file "searchHandler.ts")
export const Deleter = async(app:FastifyInsType)=>{
    app.delete("/:id",{
        schema:{
            tags:["the id of the field to delete"],
            summary:"a route that delete a areas , places and city in database",
            description:"return an message",
            
            //body:bd,
            params:deleteParam,
            Response:rs
        },
        handler:DeleteHandler
    })
}

//[FILE:searchHandler.ts](file "searchHandler.ts")
export const Updater = async (app:FastifyInsType)=>{
   app.put("/:id",{
        schema:{
            tags:["the id of the field to update"],
            summary:"a route that update a areas , places and city in database",
            description:"return an message",

            params:deleteParam,
            body:putBody,
            Response:rs
        },
        handler:putUpdate
   })
}