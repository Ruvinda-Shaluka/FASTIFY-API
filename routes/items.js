const {getItem, getItems} = require('../controllers/itemController')

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
  handler: getItems
};

const getItemOpts = {
  schema: {
    response: {
      200: Item
    },
  },
  // HANDLER IS DEFINED HERE
  handler: getItem
};

async function itemsRoutes(fastify, options) {
  // CORRECT: Only pass the options object. 
  // Fastify will pull the handler from inside getItemsOpts.
  fastify.get("/", getItemsOpts);

  // CORRECT: Only pass the options object.
  fastify.get("/:id", getItemOpts);
}

module.exports = itemsRoutes;