import express from "express";
import {
  validRecipeDescription,
  validRecipeId,
  validRecipeIngredients,
  validRecipeInstructions,
  validRecipeTitle,
} from "../validator/recipe.js";
import { validUserId } from "../validator/auth.js";
import recipeRepository from "../repository/recipeRepository.js";
import apiResponse from "../dto/apiResponse.js";
import { InRange, Positive } from "../validator/common.js";
import { transaction } from "../db/connection.js";
import ingredientRepository from "../repository/ingredientRepository.js";
import instructionRepository from "../repository/instructionRepository.js";
import userRepository from "../repository/userRepository.js";
import recipeConverter from "../dto/recipeConverter.js";

const recipeController = express.Router();

recipeController.post("/regist", async (req, res, next) => {
  try {
    const { userId, title, thumbnail, description, ingredients, instructions } =
      req.body;
    await validUserId("userId", userId);
    validRecipeTitle("title", title);
    validRecipeDescription("description", description);

    // name, quantity 두개의 key를 가진 object가 들어있는 배열
    validRecipeIngredients("ingredients", ingredients);

    // title, description, imgUrl 세개의 key를 가진 object가 들어있는 배열
    validRecipeInstructions("instructions", instructions);

    //ingredients, instructions,

    // 트랜젝션 시작
    const recipeId = await transaction(async (connection) => {
      // 레시피 저장
      const recipeId = await recipeRepository.save(
        userId,
        title,
        thumbnail,
        description,
        connection,
      );

      // 레시피의 각 요소 저장
      ingredients.forEach(({ name, quantity }) => {
        ingredientRepository.save(recipeId, name, quantity, connection);
      });

      // 레시피의 각 단계 저장
      instructions.forEach(({ title, description, imgUrl }, idx) => {
        instructionRepository.save(
          recipeId,
          title,
          description,
          imgUrl,
          idx + 1,
          connection,
        );
      });

      return recipeId;
    });
    // 트랜젝션 종료

    res.status(200).json(
      apiResponse.success({
        message: "레시피가 성공적으로 등록되었습니다.",
        result: { recipeId },
      }),
    );
  } catch (e) {
    next(e);
  }
});

// 등록한 레시피 조회
recipeController.get("/recheck", async (req, res, next) => {
  const { page, pageSize, userId } = req.query;

  try {
    // const user_id = req.session.userId;

    // if (!req.user) {
    //   throw new Error("로그인이 필요합니다.");
    // }

    Positive("page", page);
    InRange("pageSize", pageSize, 1, 10);
    await validUserId("userId", userId);

    const recipes = await recipeRepository.findByUserId(
      userId,
      Number(page),
      Number(pageSize),
    );

    res.status(200).json(
      apiResponse.success({
        message: "등록한 레시피 조회에 성공했습니다.",
        result: recipes,
      }),
    );
  } catch (e) {
    next(e);
  }
});

recipeController.get("/detail", async (req, res, next) => {
  try {
    const { recipeId } = req.query;
    await validRecipeId("recipeId", recipeId);

    const findRecipe = await recipeRepository.findById(recipeId);

    const result = await recipeConverter.toRecipeDetail(findRecipe);

    res.status(200).json({
      message: "상세 레시피가 정상 조회되었습니다.",
      result,
    });
  } catch (e) {
    next(e);
  }
});

recipeController.put("/update", async (req, res, next) => {
  try {
    const {
      recipeId,
      userId,
      title,
      thumbnail,
      description,
      ingredients,
      instructions,
    } = req.body;

    await validRecipeId("recipeId", recipeId);

    await validUserId("userId", userId);
    validRecipeTitle("title", title);
    validRecipeDescription("description", description);

    validRecipeIngredients("ingredients", ingredients);

    validRecipeInstructions("instructions", instructions);

    // 트랜잭션 시작
    await transaction(async (connection) => {
      await recipeRepository.update(
        recipeId,
        title,
        thumbnail,
        description,
        connection,
      );

      // 기존 재료 및 조리법 삭제
      await ingredientRepository.deleteIngredientsByRecipeId(
        recipeId,
        connection,
      );
      await instructionRepository.deleteInstructionsByRecipeId(
        recipeId,
        connection,
      );

      ingredients.forEach(({ name, quantity }) => {
        ingredientRepository.save(recipeId, name, quantity, connection);
      });

      instructions.forEach(({ title, description, imgUrl }, idx) => {
        instructionRepository.save(
          recipeId,
          title,
          description,
          imgUrl,
          idx + 1,
          connection,
        );
      });
    });
    // 트랜잭션 종료

    res.status(200).json(
      apiResponse.success({
        message: "레시피 수정에 성공했습니다.",
        result: { recipeId },
      }),
    );
  } catch (e) {
    next(e);
  }
});

export default recipeController;
