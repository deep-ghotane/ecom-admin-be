import express from "express";
import cors from "cors";
<<<<<<< HEAD:server.js
import mongoConnect from "./src/config/mongoConfig.js";
import config from "./src/config/config.js";
import authRouter from "./src/routes/authRouter.js";

import userRouter from "./src/routes/userRouter.js";

import categoryRouter from "./src/routes/categoryRouter.js";

import productRouter from "./src/routes/productRouter.js";
=======
import mongoConnect from "./config/mongoConfig.js";
import config from "./config/config.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
>>>>>>> 5241cda57c4237b8b3b0f959f140b47d872423d7:src/server.js

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("I am alive");
});

app.use("/public", express.static("assets/productImages"));

// auth router

app.use("/api/v1/auth", authRouter);
// category router
app.use("/api/v1/category", categoryRouter);

app.use("/api/v1/products", productRouter);

//user routes
app.use("/api/v1/user", userRouter);

mongoConnect()
  .then(() => {
    app.listen(config.port, (err) => {
      if (err) {
        console.log("SERVER COULD NOT START");
      } else {
        console.log("Server started at port", config.port);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log("MONGO DB CONNECTION ERROR");
  });
