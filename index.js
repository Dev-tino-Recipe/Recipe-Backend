import express from "express";
import logger from "morgan";
import authController from "./src/controller/authController.js";
import recipeController from "./src/controller/recipeController.js";
import imageController from "./src/controller/imageController.js";
import bookmarkController from "./src/controller/bookmarkController.js";
import session from "./src/db/session.js";
import errorInterceptor from "./src/middlewares/error.interceptor.js";
import { initDB } from "./src/db/connection.js";

const app = express();

app.use(session);

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authController);
app.use("/api/recipe", recipeController);
app.use("/api/img", imageController);
app.use("/api/bookmark", bookmarkController);

app.use(errorInterceptor);

app.listen(4000, async () => {
  // 테이블 생성
  await initDB();

  console.log("4000포트에서 서버 실행중");
});
