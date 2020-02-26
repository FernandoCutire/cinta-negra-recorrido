const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("./DataBase/Models");

const typeDefs = require("./Graphql/schema");
const resolvers = require("./Graphql/resolvers");


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

  const server = new ApolloServer({ typeDefs, resolvers });


server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(` Servidor listo en ${url}`);
});
