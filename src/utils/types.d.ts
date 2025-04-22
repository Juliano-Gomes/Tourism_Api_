import type {RawServerDefault,RawRequestDefaultExpression,RawReplyDefaultExpression,FastifyInstance, FastifyBaseLogger} from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"


export type FastifyInsType= FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
 >