const cloudinary = require("cloudinary");

const uploadFile = (stream, resourceType) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
  });

  return new Promise((resolve, reject) => {
    const buffer = cloudinary.v2.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
    stream.pipe(buffer);
  });
};

module.exports = uploadFile;
