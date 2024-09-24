import express from "express";
import logger from "morgan";
import authController from "./src/controller/authController.js";
import recipeController from "./src/controller/recipeController.js";
import imageController from "./src/controller/imageController.js";
import bookmarkController from "./src/controller/bookmarkController.js";
import session from "./src/db/session.js";
import {initDB} from "./src/db/connection.js";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();

app.use(session);

// 세션 CORS 설정
app.use(cors({
  origin : ["http://localhost:3000", "*"],
  credentials: true,
}))

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authController);
app.use("/api/recipe", recipeController);
app.use("/api/img", imageController);
app.use("/api/bookmark", bookmarkController);

app.use(errorHandler);

app.listen(4000, async () => {
  // 테이블 생성
  await initDB();

  console.log("4000포트에서 서버 실행중");
});
