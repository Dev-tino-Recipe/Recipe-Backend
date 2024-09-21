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
    const insert = await bookmarkRepository.createBookmark({
      user_id,
      recipe_id,
    });
    console.log(insert);
  } catch (e) {
    next(e);
  }
});

export default bookmarkController;
