import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  getCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} from "../controllers/customerController.js";
import type {
  CustomerParams,
  CustomerBody,
} from "../controllers/customerController.js";
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
    response: { 200: CustomerSchema },
  },
};

const postCustomerOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email"],
      properties: { name: { type: "string" }, email: { type: "string" } },
    },
    response: { 201: CustomerSchema },
  },
};

const deleteCustomerOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

const updateCustomerOpts: RouteShorthandOptions = {
  schema: {
    response: { 200: CustomerSchema },
  },
};

export default async function customerRoutes(fastify: FastifyInstance) {
  // get all customers
  fastify.get("/", getCustomersOpts, getCustomers);
  // get a single customer
  fastify.get<{ Params: CustomerParams }>("/:id", getCustomerOpts, getCustomer);
  //   save a customer
  fastify.post<{ Body: CustomerBody }>("/", postCustomerOpts, addCustomer);
  //   delete a customer
  fastify.delete<{ Params: CustomerParams }>(
    "/:id",
    deleteCustomerOpts,
    deleteCustomer,
  );
  //   update a customer
  fastify.put<{ Params: CustomerParams; Body: CustomerBody }>(
    "/:id",
    updateCustomerOpts,
    updateCustomer,
  );
}
