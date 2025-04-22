import { Delete_account, getContent, logInHandler, userHandler } from "../controllers/usercontroller";
import { FastifyInsType } from "../utils/types";
import {z} from 'zod'

const bd = z.object({
    name: z.string().default("john doe").describe("the name of the user"),
    email: z.string().email().default("johndoe@gmail.com").describe("the user's email"),
    password: z.string().min(8).default("********").describe("your access password, keep it in mind"),
    country:z.string().default("porto").describe("your actual city, to receive good suggestions of places to visit")
})

const rs = z.object({
    201:z.object({
        success:z.boolean().describe("true if the account was created").default(true),
        message:z.string().describe("a success message").default("user created with success")
    }),
    400:z.object({
        error:z.boolean().describe("true if the account wasn't created").default(false),
        message:z.string().describe("a error message").default("user wasn't created, due to empty fields detected in the request")
    }),
    406:z.object({
        error:z.boolean().describe("true if the account wasn't created").default(false),
        message:z.string().describe("a error message").default("user wasn't created , due to unacceptable data received from user")
    }),
    500:z.object({
        error:z.boolean().describe("true if the account wasn't created").default(false),
        message:z.string().describe("a error message").default("user wasn't created, due to server error")
    })
})

export const postUser = async (app : FastifyInsType)=>{
    app.post("/add",{
        schema:z.object({ 
            body: bd,
            response:rs

        }),
        handler:userHandler
    })

    app.post("/check",{
        schema:z.object({
            body:z.object({
                email:z.string().email().describe("user email").default("johndoe@gmail.com"),
                password:z.string().min(8).describe("user password").default("********")
            }),
            Response:z.object({
                200:z.object({
                    error:z.boolean().default(false).describe("true if an error occurred in log in"),
                    message:z.string().default("user not logged").describe("an error message")
                }),
                400:z.object({
                    error:z.boolean().default(false).describe("true if an error occurred in log in"),
                    message:z.string().default("user not logged").describe("an error message")
                }),
                406:z.object({
                    error:z.boolean().default(false).describe("true if an error occurred in log in"),
                    message:z.string().default("user not logged").describe("an error message")
                }),
                500:z.object({
                    error:z.boolean().default(false).describe("true if an error occurred in log in"),
                    message:z.string().default("user not logged").describe("an error message")
                })
            })
        }),
        handler:logInHandler
    })

    app.delete("/D/:id",{
        schema:z.object({
            params:z.object({
                id:z.string().uuid().describe("user id").default("1234567890"),
            })
        }),
        handler:Delete_account
    })

    app.get("/:limit",{
        schema:{
            params:z.object({
                limit:z.string()
            })
        },
        handler:getContent
    })
}