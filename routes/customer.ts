import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getCustomers, getCustomer } from "../controllers/customerController.js";
import type { CustomerParams, CustomerBody } from "../controllers/customerController.js";
import type items from "../db/items.js";


const CustomerSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
  },
};

const getCustomersOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: CustomerSchema,
      },
    },
  },
};

const getCustomerOpts: RouteShorthandOptions = {
    schema: {
        response: { 200: CustomerSchema}
    }
}

export default async function customerRoutes(fastify: FastifyInstance) {
  // get all customers
  fastify.get("/", getCustomersOpts, getCustomers);
  // get a single customer
  fastify.get<{Params: CustomerParams}>("/:id", getCustomerOpts, getCustomer);
}
