const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true },
    about: { type: String},
    albums: [{type: Schema.Types.ObjectId, ref: "album"}],
    // Para que el correo del artistasea unico
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);


mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};

module.exports = ArtistSchema;
