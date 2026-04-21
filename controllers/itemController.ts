import type { FastifyRequest, FastifyReply } from "fastify";
import { v4 as uuidv4 } from "uuid";
import items, {type Item } from "../db/items.js";

// ADDED 'export' HERE: We need to share these types with the routes file
export type ItemParams = { id: string };
export type ItemBody = { name: string };

export const getItems = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send(items);
};

export const getItem = async (
  req: FastifyRequest<{ Params: ItemParams }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  const item = items.find((i) => i.id === id);

  if (!item) {
    return reply.code(404).send({ message: "Item not found" });
  }
  return item;
};

export const addItem = async (
  req: FastifyRequest<{ Body: ItemBody }>,
  reply: FastifyReply,
) => {
  const { name } = req.body;
  const newItem: Item = {
    id: uuidv4(),
    name,
  };

  items.push(newItem);
  reply.code(201).send(newItem);
};

export const deleteItem = async (
  req: FastifyRequest<{ Params: ItemParams }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;

  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
  }

  reply.send({ message: `Item ${id} has been removed` });
};

export const updateItem = async (
  req: FastifyRequest<{ Params: ItemParams; Body: ItemBody }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  const { name } = req.body;

  const item = items.find((item) => item.id === id);

  if (!item) {
    return reply.code(404).send({ message: "Item not found" });
  }

  item.name = name;
  reply.send(item);
};
