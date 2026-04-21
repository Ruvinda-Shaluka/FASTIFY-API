const {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  // HANDLER IS DEFINED HERE
  handler: getItems,
};

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  // HANDLER IS DEFINED HERE
  handler: getItem,
};

const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: Item,
    },
  },
  // HANDLER IS DEFINED HERE
  handler: addItem,
};

const deleteItemOpts = {
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
  // HANDLER IS DEFINED HERE
  handler: deleteItem,
};

const updateItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  // HANDLER IS DEFINED HERE
  handler: updateItem,
};

async function itemsRoutes(fastify, options) {
  // CORRECT: Only pass the options object.
  // Fastify will pull the handler from inside getItemsOpts.
  fastify.get("/", getItemsOpts);

  // CORRECT: Only pass the options object.
  fastify.get("/:id", getItemOpts);

  // Add item
  fastify.post("/", postItemOpts);

  // delete item
  fastify.delete("/:id", deleteItemOpts);

  // update item
  fastify.put('/:id', updateItemOpts)
}

module.exports = itemsRoutes;
