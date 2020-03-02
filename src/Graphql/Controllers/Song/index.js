const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");

const uploaderFunction = require('../Uploader');

// ----------------------- CRUD
const addSong = async (parent, args, context, info) => {
  try {
    const { songData } = args;
    const songModel = mongoose.model("song");
    const graphqlStream = songData.song ? await songData.song : null;
    let newSongData = { ...songData, song: null };
    if (graphqlStream) {
      const { createReadStream } = graphqlStream;
      const cloudinaryStream = await createReadStream();
      //
      const { url } = await uploaderFunction(cloudinaryStream, "video");
      if (url) newSongData = { ...songData, song: url };
    }
    const albumModel = mongoose.model("album");
    const newSong = await songModel.create(newSongData);
    const filterSearch = { _id: songData.albumID };
    const update = { $push: { songs: newSong.id } };

    await albumModel.findOneAndUpdate(filterSearch, update);
    return newSong;
  } catch (error) {
    throw new UserInputError("Error al crear cancion", {
      invalidArgs: Object.keys(args)
    });
  }
};

const getSong = async (parent, args, context, info) => {
  try {
    const { songID } = args;
    const songModel = mongoose.model("song");
    const filterData = { _id: songID };
    const songs = await songModel.find(filterData);
    return songs;
  } catch (error) {
    throw new UserInputError("Error al buscar cancion", {
      invalidArgs: Object.keys(args)
    });
  }
};

const updateSong = async (parent, args, context, info) => {
  try {
    const { songData, songID } = args;
    const songModel = mongoose.model("song");
    return await songModel.findByIdAndUpdate(songID, songData, {
      new: true
    });
  } catch (error) {
    throw new UserInputError("Error al actualizar cancion", {
      invalidArgs: Object.keys(args)
    });
  }
};

const removeSong = async (parent, args, context, info) => {
  try {
    const { songID } = args;
    const SongModel = mongoose.model("song");
    const albumModel = mongoose.model("album");

    // Elimina cancion
    return await SongModel.findByIdAndRemove(songID);

    // Elimina la cancion del album
  } catch (error) {
    throw new UserInputError("Error al eliminar cancion", {
      invalidArgs: Object.keys(args)
    });
  }
};

module.exports = {
  addSong,
  getSong,
  updateSong,
  removeSong
};
