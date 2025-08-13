if (!process.env.SERVER_PORT)
  throw new Error("Missing environment variable: SERVER_PORT");

Bun.serve({
  port: process.env.SERVER_PORT,
  routes: {
    "/": (req) => {
      return new Response("OK");
    },
  },
});

console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
