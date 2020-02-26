const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema(
  { 
    title: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: "artist" },
    songs: [{ type: Schema.Types.ObjectId, ref: "song" }],
    genre: [{type: String}]
  },
  { timestamps: true }
);


mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};

module.exports = AlbumSchema;
