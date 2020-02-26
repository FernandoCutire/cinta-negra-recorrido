const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");

const getAlbum = async (parent, args, context, info) => {
  try {
    const { albumID } = args;
    const albumModel = mongoose.model("album");
    const filterData = { _id: albumID };
    const albums = await albumModel.find(filterData);
    return albums;
  } catch (error) {
    throw new UserInputError("Error al buscar usuario", {
      invalidArgs: Object.keys(args)
    });
  }
};

const addAlbum = async (parent, args, context, info) => {
  try {
    const { albumData } = args;
    const AlbumModel = mongoose.model("album");
    const ArtistModel = mongoose.model("artist");

    const newAlbum = await AlbumModel.create(albumData);
    const filterSearch = { _id: albumData.artistId };
    const update = { $push: { albums: newAlbum.id } };

    await ArtistModel.findOneAndUpdate(filterSearch, update);
    return newAlbum;
  } catch (error) {
    throw new UserInputError("Error al registrar album", {
      invalidArgs: Object.keys(args)
    });
  }
};

const updateAlbum = async (parent, args, context, info) => {
  try {
    const { albumData, albumID } = args;
    const albumModel = mongoose.model("album");
    return await albumModel.findByIdAndUpdate(albumID, albumData, {
      new: true
    });
  } catch (error) {
    throw new UserInputError("Error al actualizar album", {
      invalidArgs: Object.keys(args)
    });
  }
};

const removeAlbum = async (parent, args, context, info) => {
  try {
    const { albumId } = args;
    const albumModel = mongoose.model("album");
    const artistModel = mongoose.model("artist");
    const songModel = mongoose.model("song");

    const deleteAlbum = await albumModel.findByIdAndRemove(albumId);
    // Eliminar album del artista
    artistModel.findById(deleteAlbum.artistID, function(err, doc) {
      doc.albums.pull({ _id: albumId });
      doc.save();
    });
    // Eliminar canciones del album


  } catch (error) {
    throw new UserInputError("Error al borrar el album", {
      invalidArgs: Object.keys(args)
    });
  }
};

const getAlbumSongs = async (parent, args, context, info) => {
  try {
    const { albumID } = args;
    const AlbumModel = mongoose.model("album");
    return await AlbumModel.findById(albumID).populate("songs")
  } catch (error) {
    throw new UserInputError('Error al buscar albumes del artista', {
      invalidArgs: Object.keys(args),
    });
  }
};

const getAlbumArtist = async (parent, args, context, info) => {
  try {
    const { albumID } = args;
    const AlbumModel = mongoose.model("album");
    return await AlbumModel.findById(albumID).populate("artist")
  } catch (error) {
    throw new UserInputError('Error al buscar el artista del album', {
      invalidArgs: Object.keys(args),
    });
  }
};

module.exports = {
  getAlbum,
  addAlbum,
  removeAlbum,
  updateAlbum,
  getAlbumSongs,
  getAlbumArtist
};
