const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, max: 100 },
    lastName: { type: String },
    password: { type: String, required: true },
    // Para que el correo sea unico
    email: { type: String, required: true, unique: true },
    publications: [
      {
        type: Schema.Types.ObjectId,
        ref: "publication"
      }
    ]
  },
  { timestamps: true }
);


mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};

UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.genSalt(10, function (error, salt) {
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});

module.exports = UserSchema;
