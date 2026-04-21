import type { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";
import customers, { type Customer } from "../db/customers.js";

export type CustomerParams = { id: string };
export type CustomerBody = { name: string; email: string };

export const getCustomers = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  reply.send(customers);
};

export const getCustomer = async (
  req: FastifyRequest<{ Params: CustomerParams }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  const customer = customers.find((c) => c.id === id);
  if (!customer) {
    reply.status(404).send({ error: "Customer not found" });
    return;
  }
  reply.send(customer);
};

export const addCustomer = async (
  req: FastifyRequest<{ Body: CustomerBody }>,
  reply: FastifyReply,
) => {
  const { name, email } = req.body;
  const newCustomer: Customer = {
    id: uuidv4(), 
    name,
    email,
  };
  customers.push(newCustomer);
  reply.status(201).send(newCustomer);
};

export const deleteCustomer = async (
  req: FastifyRequest<{ Params: CustomerParams }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  const customerIndex = customers.findIndex((c) => c.id === id);
  if (customerIndex === -1) {
    reply.status(404).send({ error: "Customer not found" });
    return;
  }
  customers.splice(customerIndex, 1);
  reply.send({ message: `${id} Customer deleted successfully` });
};

export const updateCustomer = async (
  req: FastifyRequest<{ Params: CustomerParams; Body: CustomerBody }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    // Use .code() for Fastify standard
    return reply.code(404).send({ message: "Customer not found" });
  }

  // Only update fields if they were actually provided in the request body
  if (name !== undefined) customer.name = name;
  if (email !== undefined) customer.email = email;

  return reply.send(customer);
};
