import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getCustomers } from "../controllers/customerController.js";

const CustomerSchema = {
    type: "Object",
    properties: {
        id: {type:'string'},
        name: {type:'string'},
        email: {type:'string'}
    }
}

const getCustomersOpts: RouteShorthandOptions = {
    schema:{
        response:{
            200: {
                type: "array", customers: CustomerSchema
            }
        }
    }
}

export default async function customerRoutes(fastify:FastifyInstance) {

    // get all customers
    fastify.get("/" , getCustomersOpts, getCustomers)
    
}