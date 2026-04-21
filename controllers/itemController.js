const {v4: uuidv4} = require('uuid')
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

const addItem = async (req, reply) =>{
    const {name} = req.body
    const newItem = {
        id: uuidv4(),
        name
    }

    items.push(newItem)

    reply.code(201).send(newItem)
}

const deleteItem = (req, reply) => {
  const { id } = req.params;
  
  const index = items.findIndex((item) => item.id === id);
  
  if (index !== -1) {
    items.splice(index, 1); // Removes the item at that index
  }

  reply.send({ message: `Item ${id} has been removed` });
};

module.exports = {
    getItem,
    getItems,
    addItem,
    deleteItem
}
