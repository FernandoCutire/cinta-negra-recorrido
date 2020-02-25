const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Esquema de cancion
const SongSchema = new Schema(
  {
    title: { type: String, required: true },
    genre: { type: String },
    duration: { type: String, required: true },
    albumID: { type: Schema.Types.ObjectId, ref: "album" }
  },
  { timestamps: true }
);

mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};

module.exports = SongSchema;
