const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true },
    about: { type: String},
    albums: [{type: Schema.Types.ObjectId, ref: "album"}],
  },
  { timestamps: true }
);


mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};

module.exports = ArtistSchema;
