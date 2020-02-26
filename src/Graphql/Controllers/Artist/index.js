const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");

const getArtist = async (parent, args, context, info) => {
  try {
    const { artistID } = args;
    const artistModel = mongoose.model("artist");
    const filterData = { _id: artistID };
    const artists = await artistModel.find(filterData);
    return artists;
  } catch (error) {
    throw new UserInputError("Error al registrar artista", {
      invalidArgs: Object.keys(args)
    });
  }
};

const updateArtist = async (parent, args, context, info) => {
  try {
    const { artistData, artistID } = args;
    const artistModel = mongoose.model("artist");
    return await artistModel.findByIdAndUpdate(artistID, artistData, {
      new: true
    });
  } catch (error) {
    throw new UserInputError("Error al actualizar artista", {
      invalidArgs: Object.keys(args)
    });
  }
};

const addArtist = async (parent, args, context, info) => {
  try {
    const { artistData } = args;
    const artistModel = mongoose.model("artist");
    const artistAdded = await artistModel.create(artistData);
    return artistAdded;
  } catch (error) {
    throw new UserInputError("Error al registrar artista", {
      invalidArgs: Object.keys(args)
    });
  }
};

const removeArtist = async (parent, args, context, info) => {
  try {
    const { artistID } = args;
    const ArtistModel = mongoose.model("artist");
    const albumModel = mongoose.model("album");
    const songModel = mongoose.model("song");

    // Elimina al artista
    return await ArtistModel.findByIdAndRemove(artistID);
    
    // Eliminar albumes del artista

    // Eliminar sus canciones

  } catch (error) {
    throw new UserInputError("error al eliminar artista", {
      invalidArgs: Object.keys(args)
    });
  }
};

const getArtistAlbums = async (parent, args, context, info) => {
  try {
    const { artistID } = args;
    const ArtistModel = mongoose.model("artist");
    return await ArtistModel.findById(artistID).populate("albums")
  } catch (error) {
    throw new UserInputError('Error al buscar albumes del artista', {
      invalidArgs: Object.keys(args),
    });
  }
};

module.exports = {
  getArtist,
  addArtist,
  updateArtist,
  removeArtist,
  getArtistAlbums
};
