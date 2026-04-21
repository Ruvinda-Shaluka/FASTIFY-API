import type { FastifyReply, FastifyRequest } from "fastify";
import customers, {type Customer} from "../db/customers.js";

export type CustomerParams = {id: string}
export type CustomerBody = {name: string, email:string}

export const getCustomers = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send(customers)
}

export const getCustomer = async (req: FastifyRequest<{Params: CustomerParams}>, reply: FastifyReply) => {
    const { id } = req.params;
    const customer = customers.find((c) => c.id === id);
    if (!customer) {
        reply.status(404).send({ error: "Customer not found" });
        return;
    }
    reply.send(customer);
}


