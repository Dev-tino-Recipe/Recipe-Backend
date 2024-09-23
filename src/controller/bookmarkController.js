import express from "express";
import {
  UserNameLengthCheck,
  PasswordLengthCheck,
} from "../validator/common.js";
import { UserNameCheck } from "../validator/auth.js";
import bookmarkRepository from "../repository/bookmarkRepository.js";
import CustomError from "../error/Error.js";

const bookmarkController = express.Router();

bookmarkController.post("/regist", async (req, res, next) => {
  const { user_id, recipe_id } = req.body;
  try {
    const insert = await bookmarkRepository.createBookmark(user_id, recipe_id);
    if (insert.affectedRows) {
      res
        .status(200)
        .json({ is_Success: true, message: "북마크 등록에 성공했습니다." });
    }
  } catch (e) {
    next(e);
  }
});

bookmarkController.delete("/delete", async (req, res, next) => {
  const { user_id, recipe_id } = req.body;
  try {
    const del = await bookmarkRepository.deleteBookmark(user_id, recipe_id);
    console.log(del);
    if (del.affectedRows) {
      res
        .status(200)
        .json({ is_Success: true, message: "북마크 삭제에 성공했습니다." });
    } else {
      res
        .status(400)
        .json({ is_Success: false, message: "북마크 삭제에 실패했습니다." });
    }
  } catch (e) {
    next(e);
  }
});

export default bookmarkController;
