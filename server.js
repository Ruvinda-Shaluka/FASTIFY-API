const fastify = require("fastify")({ logger: true });

const PORT = 5000;

fastify.register(require("./routes/items"), { prefix: "/items" });
fastify.ready((err) => {
  if (err) throw err;
  console.log(fastify.printRoutes()); // This will print every valid URL your server knows!
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
