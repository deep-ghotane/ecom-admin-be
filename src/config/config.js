import dotenv from "dotenv";

dotenv.config();
const config = {
  salt: +process.env.SALT || 10,
  port: process.env.PORT || 4000,
  mongoOptions: {
    url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/ecommerce-admin",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresin: process.env.EXPIRES_IN || "7d",
  },
};

export default config;
