import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

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

// Instantiate the server with config. 
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

// Start up the server and listen for the URL 
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready for blast off at: ${url}`);
});
