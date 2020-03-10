const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("./Database/Models");

const typeDefs = require("./Graphql/schema");
const resolvers = require("./Graphql/resolvers");

const {
  AuthorizationUser,
  getContextUser,
} = require("./Graphql/Controllers/Authentication/directivesUser");

const {
  AuthorizationArtist,
  getContextArtist,
} = require("./Graphql/Controllers/AuthenticationArtist/directiveArtist");

mongoose.connect(
  process.env.URL_DATABASE, 
  {
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
  context: async ({ req }) => getContextUser(req),
  context: async ({ req }) => getContextArtist(req),
  schemaDirectives: {
    AuthorizationUser,
    AuthorizationArtist
  },
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(` Servidor listo en ${url}`);
});
