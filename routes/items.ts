import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} from "../controllers/itemController.js";

// ADDED THIS IMPORT: Bring in the types from the controller
import type { ItemParams, ItemBody } from "../controllers/itemController.js";

const ItemSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

const getItemsOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: { type: "array", items: ItemSchema },
    },
  },
};

const getItemOpts: RouteShorthandOptions = {
  schema: {
    response: { 200: ItemSchema },
  },
};

const postItemOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: { name: { type: "string" } },
    },
    response: { 201: ItemSchema },
  },
};

const deleteItemOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
};

const updateItemOpts: RouteShorthandOptions = {
  schema: {
    response: { 200: ItemSchema },
  },
};

export default async function itemsRoutes(fastify: FastifyInstance) {
  // NO CHANGES: This doesn't take params or a body
  fastify.get("/", getItemsOpts, getItems);

  // ADDED GENERICS <{ ... }> to match the controller's strict rules
  fastify.get<{ Params: ItemParams }>("/:id", getItemOpts, getItem);

  fastify.post<{ Body: ItemBody }>("/", postItemOpts, addItem);

  fastify.delete<{ Params: ItemParams }>("/:id", deleteItemOpts, deleteItem);

  fastify.put<{ Params: ItemParams; Body: ItemBody }>(
    "/:id",
    updateItemOpts,
    updateItem,
  );
}
