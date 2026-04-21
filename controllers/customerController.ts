import type { FastifyReply, FastifyRequest } from "fastify";
import customers, {type Customer} from "../db/customers.js";

export const getCustomers = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send(customers)
}