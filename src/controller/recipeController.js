import express from "express";
import {
  DescriptionLengthCheck,
  InRange,
  NameLengthCheck,
  Positive,
  QuantityLengthCheck,
  TitleLengthCheck,
  UserNameLengthCheck,
} from "../validator/common.js";
import { UserNameCheck } from "../validator/auth.js";
import CustomError from "../error/Error.js";
import { upload_single } from "../aws/s3.js";
import authRepository from "../repository/authRepository.js";
import { v4 as generate_uuid } from "uuid";
import recipeRepository from "../repository/recipeRepository.js";

const recipeController = express.Router();

recipeController.post(
  "/regist",
  upload_single("image"),
  async (req, res, next) => {
    try {
      const data = req.file;
      const { user_id, title, description, ingredients, instructions } =
        req.body;

      TitleLengthCheck("title", title);
      DescriptionLengthCheck("description", description);

      ingredients.forEach((ingredient) => {
        NameLengthCheck("name", ingredient.name);
        QuantityLengthCheck("quantity", ingredient.quantity);
      });

      instructions.forEach((instruction) => {
        TitleLengthCheck("instruction", instruction.name);
        DescriptionLengthCheck("instruction", instruction.instruction);
      });

      UserNameCheck(user_id);

      const finalThumbnail = data ? data.path : req.body.thumbnail;

      const newRecipe = {
        recipe_id,
        user_id,
        title,
        thumbnail: finalThumbnail,
        description,
        ingredients,
        instructions,
      };

      const result = await recipeRepository.createRecipe(newRecipe);
      if (result) {
        res.status(200).json({
          is_success: true,
          message: "레시피 등록에 성공적으로 생성되었습니다.",
          recipe_id,
        });
      } else {
        // throw new CustomError("레시피 등록에 실패했습니다.", 400);
      }
    } catch (e) {
      next(e);
    }
  },
);

recipeController.get("/recipe/posted", async (req, res, next) => {
  const { page, pageSize } = req.query;
  const user_id = req.user.user_id;
  try {
    Positive("page", page);
    InRange("pageSize", pageSize, 1, 10);

    const recipes = await recipeRepository.getPostedRecipesByPaging(
      user_id,
      Number(page),
      Number(pageSize),
    );

    const formattedRecipes = recipes.map((recipe) => ({
      recipe_id: recipe.recipe_id,
      title: recipe.title,
      thumbnail: recipe.thumbnail,
      user_name: recipe.user_name,
      description: recipe.description,
    }));
    if (formattedRecipes.length > 0) {
      res.status(200).json({
        recipes: formattedRecipes,
        is_success: true,
        message: "등록한 레시피 조회에 성공했습니다.",
      });
    } else {
      res.status(200).json({
        recipes: [],
        is_success: false,
        message: "등록한 레시피가 없습니다.",
      });
    }
  } catch (e) {
    next(e);
  }
});

recipeController.get("/detail/:recipeId", async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const result = await recipeRepository.getRecipe(recipeId);
    if (result.length) {
      res.status(200).json({
        isMine: false,
        isBookMarked: true,
        isSuccess: true,
        message: "상세 레시피가 정상 조회되었습니다.",
        result: result,
      });
    } else {
      res.status(400).json({ message: "레시피가 없습니다.", result: result });
    }
  } catch (e) {
    next(e);
  }
});

recipeController.post("/recipe/recent", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});


export default recipeController;
