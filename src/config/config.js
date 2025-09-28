import dotenv from "dotenv";

dotenv.config();
const config = {
  salt: +process.env.SALT || 10,
  port: process.env.PORT || 4000,
  mongoOptions: {
    url: process.env.MONGO_URL,
  },

  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresin: process.env.EXPIRES_IN || "7d",
  },

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  },
};

export default config;
