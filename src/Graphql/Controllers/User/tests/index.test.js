const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../../../../Database/Models");

const {addUser} = require("../index")

const { UserInputError } = require("apollo-server");

const { createToken } = require("../../Authentication/");
const uploaderFunction = require("../../Uploader");



if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }


describe("UserControllers", () => {
    let db;

    beforeAll(async () => {
        mongoose.connect(
            process.env.URL_DATABASE_TEST,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
            }
        );
        db = mongoose.connection;
    });

    afterAll( async () => {
        await db.close();
    });

    afterEach(async () => {
        const collections = await mongoose.connection.db.collections();
        for(let collection of collections) {
            await collection.remove();
        }
    });

    describe('addUser', () => {
        it(' should register a user', async () => {
          const userData = {
            name: "user from test",
            lasName: "-",
            email: "test@gmail.com",
            age: 25,
            password: "123"
          };
          const { token } = await addUser(undefined, { userData }, undefined, undefined);
          expect(token).not.toBeUndefined();
        });
      });

    
    describe("", () => {

    })


})  

