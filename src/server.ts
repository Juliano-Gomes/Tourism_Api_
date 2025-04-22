import Fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import cors from '@fastify/cors'
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";

//multipart importation
import Multipart from "@fastify/multipart";
import { Deleter, Post, Search, Updater } from "./routes/Post";
import { postUser } from "./routes/user";

//static
import fs_static from '@fastify/static'
import { join } from "path";

const app = Fastify({
    logger:{
    transport:{
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
    }}
}).withTypeProvider<ZodTypeProvider>()

app.register(fs_static, {
    root: join(process.cwd(), 'src','cities'),
    prefix: '/', 
})
  
app.register(cors,{
    origin: "*"
})

app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
});
  
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

//registering the routes 
app.register(Multipart,{ attachFieldsToBody: true })
    //post route
app.register(postUser,{
    prefix: '/addUser',
})

app.register(Post,{
    prefix: '/NewPost',
})

app.register(Search,{
    prefix: 'destine',
})

app.register(Deleter,{
    prefix: '/delete',
})

app.register(Updater,{
    prefix: '/up',
})
// last part
const listner = async()=>{
    try {
        await app.listen({
            port: 8011,
            host: '0.0.0.0',
        })
        //console.log(process.cwd())
    } catch (error) {
        console.log("an error occurred ,", error)
    }
}

listner()