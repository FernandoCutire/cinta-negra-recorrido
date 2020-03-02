const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");

const { createToken } = require("../../Controllers/Authentication");
const uploaderFunction = require("../Uploader");

const userLogin = async (parent, args, context, info) => {
  try {
    const { email, password } = args;
    const UserModel = mongoose.model("user");
    const filterSearch = { email };
    const currentUser = await UserModel.findOne(filterSearch);
    if (currentUser) {
      const validLogin = await bcrypt.compare(password, currentUser.password);
      if (validLogin) {
        const token = createToken(currentUser);
        return { token };
      }
      throw true;
    }
    throw true;
  } catch (error) {
    throw new UserInputError("Error al hacer login", {
      invalidArgs: Object.keys(args)
    });
  }
};

const getUser = async (parent, args, context, info) => {
  try {
    const { userID } = args;
    const userModel = mongoose.model("user");
    const filterData = { _id: userID };
    const users = await userModel.find(filterData);
    return users;
  } catch (error) {
    throw new UserInputError("Error al buscar usuario", {
      invalidArgs: Object.keys(args)
    });
  }
};

const addUser = async (parent, args, context, info) => {
  try {
    const { userData } = args;
    const userModel = mongoose.model("user");
    const graphqlStream = userData.profileImage ? await userData.profileImage : null;
    let newUserData = { ...userData, profileImage: null };
    if (graphqlStream) {
      const { createReadStream } = graphqlStream;
      const cloudinaryStream = await createReadStream();
      //resource_type: "video" video/audio
      const { url } = await uploaderFunction(cloudinaryStream, 'image');
      if (url) newUserData = { ...userData, profileImage: url };
    }
    const userAdded = await userModel.create(newUserData);
    const token = createToken(userAdded);
    return { token };
  } catch (error) {
    throw new UserInputError("Error al registrar al usuario", {
      invalidArgs: Object.keys(args)
    });
  }
};

const updateUser = async (parent, args, context, info) => {
  try {
    const { userData, userID } = args;
    const userModel = mongoose.model("user");
    return await userModel.findByIdAndUpdate(userID, userData, {
      new: true
    });
  } catch (error) {
    throw new UserInputError("error al actualizar usuario", {
      invalidArgs: Object.keys(args)
    });
  }
};

const removeUser = async (parent, args, context, info) => {
  try {
    const { userID } = args;
    const UserModel = mongoose.model("user");

    return await UserModel.findByIdAndRemove(userID);
  } catch (error) {
    throw new UserInputError("error al eliminar usuario", {
      invalidArgs: Object.keys(args)
    });
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  removeUser,
  userLogin
};
