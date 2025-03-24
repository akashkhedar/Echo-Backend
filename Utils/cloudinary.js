const { v2 } = require("cloudinary");
const cloudinary = v2;
const fs = require("fs");
const { loadEnvFile } = require("process");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadResult = async (localFilePath) => {
  if (!localFilePath) {
    return null;
  }
  const fileDetails = await cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "auto",
    })
    .catch((error) => {
      fs.unlinkSync(localFilePath);
      console.log(error);
    });
  return fileDetails.secure_url;
};

const getImage = (imagePath) => {
  return cloudinary.url(imagePath, {
    transformation: [
      { width: "auto", crop: "scale" },
      { quality: "auto" },
      { fetch_format: "auto" },
      { dpr: "auto" },
    ],
  });
};

const getVideo = async (fileUrl) => {
  await cloudinary.video(fileUrl, {
    transformation: [
      { width: 1000, crop: "scale" },
      { quality: "auto:best" },
      { fetch_format: "auto" },
    ],
  });
};

module.exports = {
  uploadResult,
};
