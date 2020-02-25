const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");

const { createToken } = require("../../Controllers/Authentication");

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
    const userAdded = await userModel.create(userData);
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
  removeUser
};
