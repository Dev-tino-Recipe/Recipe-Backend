import express from "express";
import bookmarkRepository from "../repository/bookmarkRepository.js";
import { returnResponse } from "../utils/response.js";
import userRepository from "../repository/userRepository.js";
import recipeRepository from "../repository/recipeRepository.js";
import apiResponse from "../dto/apiResponse.js";

const bookmarkController = express.Router();

bookmarkController.post("/regist", async (req, res, next) => {
  const { userId, recipeId } = req.body;
  try {
    const findUser = await userRepository.findById(userId);
    console.log(findUser);
    if (!findUser) {
      res.status(404).json(
        apiResponse.failure({
          message: "존재하지 않는 유저입니다.",
        }),
      );
    }
    const findRecipe = await recipeRepository.findById(recipeId);
    if (!findRecipe) {
      res.status(404).json(
        apiResponse.failure({
          message: "존재하지 않는 레시피입니다.",
        }),
      );
    }
    const findBookmark = await bookmarkRepository.findByRecipeIdAndUserId(
      recipeId,
      userId,
    );
    if (findBookmark) {
      res.status(400).json(
        apiResponse.failure({
          message: "이미 존재하는 북마크입니다.",
        }),
      );
    }
    const insert = await bookmarkRepository.createBookmark(userId, recipeId);
    if (insert) {
      res.status(200).json(
        apiResponse.success({
          message: "북마크 등록에 성공했습니다.",
        }),
      );
    }
  } catch (e) {
    next(e);
  }
});

bookmarkController.delete("/delete", async (req, res, next) => {
  const { userId, recipeId } = req.body;
  try {
    const del = await bookmarkRepository.deleteBookmark(userId, recipeId);
    if (del.affectedRows) {
      res.status(200).json(
        apiResponse.success({
          message: "북마크 삭제에 성공했습니다.",
        }),
      );
    } else {
      res.status(400).json(
        apiResponse.failure({
          message: "북마크 삭제에 실패했습니다.",
        }),
      );
    }
  } catch (e) {
    next(e);
  }
});

export default bookmarkController;
