const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Token {
    token: String,
  }

  # objeto User, de base de datos
  type User {
    _id: ID
    name: String!
    lastName: String
    age: Int
    email: String!
    createdAt: Date
    updatedAt: Date
  }

  # objeto Artist, de base de datos
  type Artist {
    _id: ID
    name: String!
    about: String
    albums: [ID]
  }

  type ArtistInfo {
    _id: ID
    name: String!
    about: String
    albums: [Album]
  }

  # objeto Album, de base de datos
  type Album {
    _id: ID
    title: String!
    genre: [String]
    artist: [ID]
    songs: [ID]
    createdAt: Date
    updatedAt: Date
  }

  type AlbumInfo {
    _id: ID
    title: String!
    genre: [String!]
    artist: Artist
    songs: [Song]
    createdAt: Date
    updatedAt: Date
  }

  # objeto Song, de base de datos
  type Song {
    _id: ID
    title: String!
    albumID: ID
    genre: String!
    duration: String!
    createdAt: Date
    updatedAt: Date
  }

  # argumento UserInput, para la mutation
  input UserInput {
    name: String!
    age: Int
    email: String!
    lastName: String
    password: String!
  }

  # argumento ArtistInput, para la mutation
  input ArtistInput {
    name: String!
    about: String
  }

  # argumento AlbumInput, para la mutation
  input AlbumInput {
    title: String!
    artistID: ID
    genre: [String]
  }

  # argumento SongInput, para la mutation
  input SongInput {
    title: String!
    genre: String!
    albumID: ID!
    duration: String!
  }

  type Query {
    # TODOS LOS GETS
    getUser(userID: ID): [User]
    getArtist(artistID: ID): Artist
    getAlbum(albumID: ID): Album
    getSong(songID: ID): Song
    getArtistAlbums(artistID: ID): ArtistInfo
    getAlbumSongs(albumID: ID): AlbumInfo
    getAlbumArtist(albumID: ID): AlbumInfo
  }

  type Mutation {
    # CUD USER
    addUser(userData: UserInput): Token
    updateUser(userID: ID, userData: ArtistInput): User
    removeUser(userID: ID): User 

    # CUD ARTIST
    addArtist(artistData: ArtistInput): Artist
    updateArtist(artistID: ID, artistData: ArtistInput): Artist
    removeArtist(artistID: ID): Artist 
    
    # CUD ALBUM
    addAlbum(albumData: AlbumInput): Album
    updateAlbum(albumID: ID, albumData: AlbumInput):Album
    removeAlbum(albumID: ID): Album
    
    # CUD SONG
    addSong(songData: SongInput): Song
    updateSong(songID: ID, songData: SongInput): Song
    removeSong(songID: ID): Song
    
  }
`;

module.exports = typeDefs;
