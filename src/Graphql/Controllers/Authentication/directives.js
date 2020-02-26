const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {
  SchemaDirectiveVisitor,
  AuthenticationError
} = require("apollo-server");
const { defaultFieldResolver } = require("graphql");

class AutorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const ctx = args[2];
      if (ctx.userData) {
        return await resolve.apply(this, args);
      } else {
        throw new AuthenticationError(
          "Necesitar haber iniciado sesion para realizar esta funcion"
        );
      }
    };
  }
}

const getContext = req => {
  try {
    const token = req.headers.authorizationtoken;
    if (typeof token === typeof undefined) return req;
    return jwt.verify(token, process.env.JWT_SECRET, async function(
      error,
      result
    ) {
      if (error) return req;
      try {
        const UserModel = mongoose.model("user");
        const userData = await UserModel.findById(result._id)
        return { ...req, userData };
      } catch (error) {
        return req;
      }
    });
  } catch (error) {
    return req;
  }
};

module.exports = {
  AutorizationDirective,
  getContext
};
