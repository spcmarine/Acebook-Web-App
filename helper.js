require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    });
    console.log(res)
    return res;
}

module.exports = handleUpload;
