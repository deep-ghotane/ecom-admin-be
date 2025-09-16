import dotenv from "dotenv";

dotenv.config();
const config = {
  port: process.env.PORT || 4000,
  mongoOptions: {
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/e-commerce",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresin: process.env.EXPIRES_IN || "7d",
  },
};

export default config;
