import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';

const startApolloServer = async () => {
  const app = express();

  const httpServer = http.createServer(app);


  const server = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });


  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // });

  await server.start();


  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  )

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
};


startApolloServer();