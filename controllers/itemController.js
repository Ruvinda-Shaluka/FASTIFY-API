const items = require("../items");

const getItems = async (req, reply) =>{
    reply.send(items)
}

const getItem = async (req, reply) =>{
    const { id } = req.params;
    const item = items.find((i) => i.id === id);

    if (!item) {
      return reply.code(404).send({ message: "Item not found" });
    }
    return item;
}

module.exports = {
    getItem,
    getItems
}
