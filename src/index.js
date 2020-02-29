const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("./DataBase/Models");

const typeDefs = require("./Graphql/schema");
const resolvers = require("./Graphql/resolvers");

const {
  AuthorizationDirective,
  getContext
} = require("./Graphql/Controllers/Authentication/directives");

mongoose
  .connect(process.env.URL_DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Base de datos conectada!!");
  })
  .catch(error => {
    console.log("TCL: error", error);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => getContext(req),
  schemaDirectives: {
    AuthorizationDirective
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(` Servidor listo en ${url}`);
});
