const mongoose = require("mongoose");
require("../../../../Database/Models");

const {addArtist} = require("../index")
 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

describe("ArtistControllers", () => {
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

    describe("addArtist", () => {
        it("should register a artist", async () => {
            const artistData = {
                name : "Artist 1",
                about: "an artist from test",
                email: "test@gmail.com",
                password: "test123"
            };
            const { token } = await addArtist(undefined, { artistData }, undefined, undefined);
            expect(token).not.toBeUndefined();
        })
    }) 


})