const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {
  SchemaDirectiveVisitor,
  AuthenticationError
} = require("apollo-server");
const { defaultFieldResolver } = require("graphql");

class AuthorizationArtist extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const ctx = args[2];
      if (ctx.artistData) {
        return await resolve.apply(this, args);
      } else {
        throw new AuthenticationError("Necesitas estar logueado");
      }
    };
  }
}

const getContextArtist = req => {
  try {
    const token = req.headers.artistauthorizationtoken;
    if (typeof token === typeof undefined) return req;
    return jwt.verify(token, process.env.JWT_SECRET, async function(
      error,
      result
    ) {
      if (error) return req;
      try {
        const ArtistModel = mongoose.model("artist");
        const artistData = await ArtistModel.findById(result._id);
        return { ...req, artistData };
      } catch (error) {
        return req;
      }
    });
  } catch (error) {
    return req;
  }
};

module.exports = {
  AuthorizationArtist,
  getContextArtist
};
