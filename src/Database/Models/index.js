const mongoose = require('mongoose');

// import schemas
const UserSchema = require('../Schemas/User');
const ArtistSchema = require('../Schemas/Artist');
const AlbumSchema = require('../Schemas/Album');
const SongSchema = require('../Schemas/Song');



mongoose.model('user', UserSchema)
mongoose.model('artist', ArtistSchema)
mongoose.model('album', AlbumSchema)
mongoose.model('song', SongSchema)
