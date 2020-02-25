const { getUser, addUser, updateUser, removeUser } = require("./Controllers/User");
const {getArtist, addArtist, updateArtist, removeArtist} = require("./Controllers/Artist")
const {getAlbum, addAlbum, updateAlbum, removeAlbum} = require("./Controllers/Album")
const {getSong, addSong, updateSong, removeSong} = require("./Controllers/Song")


const resolvers = {
  Query: {
    getUser,
    getArtist,
    getAlbum,
    getSong,
  },
  Mutation: {
    // User
    addUser,
    updateUser,
    removeUser,
    // Artist
    addArtist,
    updateArtist,
    removeArtist,
    // Album
    addAlbum,
    updateAlbum,
    removeAlbum,
    // Song
    addSong,
    updateSong,
    removeSong
  }
};

module.exports = resolvers;
