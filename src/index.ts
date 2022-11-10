import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import gql from "graphql-tag";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";

//Define the query contracts via schema
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

const resolvers = {
  Query: {
    // the return value of this function will be the value of the helloWorld field
    helloWorld: () => "hello",
  },
};

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Instantiate the server with config.
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // start the apollo server
  await server.start();

  // apply the servers to the /graphql route
  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  // Start up the server and listen for the URL
  httpServer.listen({ port: 4000 }, () => {
    console.log(`Server ready for blast off at: http://localhost:4000`);
  });
};

startServer();
