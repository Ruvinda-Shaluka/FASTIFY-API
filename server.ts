import Fastify from 'fastify';
import itemsRoutes from './routes/items.js';
import customerRoutes from './routes/customer.js'

const fastify = Fastify({ logger: true });
const PORT = 5000;

fastify.register(itemsRoutes, { prefix: "/items" });
fastify.register(customerRoutes, {prefix: "/customers"})

fastify.ready((err) => {
  if (err) throw err;
  console.log(fastify.printRoutes());
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