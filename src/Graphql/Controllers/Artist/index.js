const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");
const { createToken } = require("../../Controllers/Authentication");

const uploaderFunction = require("../Uploader");

const artistLogin = async (parent, args, context, info) => {
  try {
    const { email, password } = args;
    const artistModel = mongoose.model("artist");

    const filterSearch = { email };
    const currentArtist = await artistModel.findOne(filterSearch);
    if (currentArtist) {
      const validLogin = await bcrypt.compare(password, currentArtist.password);
      if (validLogin) {
        const token = createToken(currentArtist);
        return { token };
      }
      throw true;
    }
    throw true;
  } catch (error) {
    throw new UserInputError("Error al iniciar sesión como artista", {
      invalidArgs: Object.keys(args)
    });
  }
};

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
    const graphqlStream = artistData.profileImage ? await artistData.profileImage : null;
    let newArtistData = {...artistData, profileImage: null};
    if(graphqlStream){
      const { createReadStream } = graphqlStream;
      const cloudinaryStream = await createReadStream();
      // cambiale a "video" para poner audio
      const { url } = await uploaderFunction(cloudinaryStream, "image");
      if(url) newArtistData = {...artistData, profileImage: url};
    }
    const artistAdded = await artistModel.create(newArtistData);
    const token = createToken(artistAdded);
    return { token };
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
    const deletedArtist = await ArtistModel.findByIdAndRemove(artistID);

    // Eliminar albumes del artista
    deletedArtist.albums.forEach(async albumID => {
      const deletedAlbum = await albumModel.findByIdAndRemove(albumID);
      // Eliminar sus canciones
      deletedAlbum.songs.forEach(async songID => {
        await songModel.findByIdAndRemove(songID);
      });
    });

    return deletedArtist;

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
    const AlbumModel = mongoose.model("album");
    return await ArtistModel.findById(artistID).populate("albums");
  } catch (error) {
    throw new UserInputError("Error al buscar albumes del artista", {
      invalidArgs: Object.keys(args)
    });
  }
};

module.exports = {
  getArtist,
  artistLogin,
  addArtist,
  updateArtist,
  removeArtist,
  getArtistAlbums
};
