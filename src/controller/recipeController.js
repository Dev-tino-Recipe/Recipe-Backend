import express from "express";
import {
  validRecipeDescription,
  validRecipeIngredients,
  validRecipeInstructions,
  validRecipeTitle
} from "../validator/recipe.js";
import {validUserId} from "../validator/auth.js";
import recipeRepository from "../repository/recipeRepository.js";
import apiResponse from "../dto/apiResponse.js";

const recipeController = express.Router();

recipeController.post(
    "/regist",
    async (req, res, next) => {
      try {
        const {
          userId, title, thumbnail, description, ingredients, instructions,
        } = req.body;

        await validUserId("userId", userId);
        validRecipeTitle("title", title);
        validRecipeDescription("description", description);

        // name, quantity 두개의 key를 가진 object가 들어있는 배열
        validRecipeIngredients("ingredients", ingredients);

        // title, description, imgUrl 세개의 key를 가진 object가 들어있는 배열
        validRecipeInstructions("instructions", instructions);

        console.log("유효성 검사 통과");

        await recipeRepository.createRecipe({
          userId, title, thumbnail, description, ingredients, instructions,
        });

        console.log("레시피 등록 성공");

        res.status(200).json(
            apiResponse.success({message: "레시피가 성공적으로 등록되었습니다."})
        );
      } catch (e) {
        next(e);
      }
    },
);

// recipeController.get("/recheck", async (req, res, next) => {
//   const {page, pageSize, user_id} = req.query;
//
//   try {
//     // const user_id = req.session.userId;
//
//     // if (!req.user) {
//     //   throw new Error("로그인이 필요합니다.");
//     // }
//
//     Positive("page", page);
//     InRange("pageSize", pageSize, 1, 10);
//
//     const recipes = await recipeRepository.getPostedRecipesByPaging(
//         user_id,
//         Number(page),
//         Number(pageSize),
//     );
//
//     const formattedRecipes = recipes.map((recipe) => ({
//       recipe_id: recipe.recipe_id,
//       title: recipe.title,
//       thumbnail: recipe.thumbnail,
//       user_name: recipe.user_name,
//       description: recipe.description,
//     }));
//     res
//         .status(200)
//         .json(
//             returnResponse(
//                 true,
//                 "등록한 레시피 조회에 성공했습니다.",
//                 formattedRecipes,
//             ),
//         );
//   } catch (e) {
//     next(e);
//   }
// });

// recipeController.get("/detail", async (req, res, next) => {
//   try {
//     const {recipe_id} = req.query;
//     // console.log(recipe_id);
//     const result = await recipeRepository.getRecipe(recipe_id);
//     if (result) {
//       res.status(200).json({
//         isMine: false,
//         isBookMarked: true,
//         isSuccess: true,
//         message: "상세 레시피가 정상 조회되었습니다.",
//         result,
//       });
//     } else {
//       res
//           .status(400)
//           .json({message: "상세 레시피 조회가 실패했습니다.", result});
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// recipeController.get("/recent", async (req, res, next) => {
//   try {
//     const {recipe_id} = req.body;
//     const recipe_ids = recipe_id.map((value) => value.value);
//     const placeholder = recipe_id.map(() => "?").join(", ");
//
//     // 최근 레시피 조회
//     const result = await recipeRepository.getRecentRecipe(
//         recipe_ids,
//         placeholder,
//     );
//
//     if (result.length) {
//       res.status(200).json({
//         isSuccess: true,
//         message: "최근 본 레시피 조회에 성공했습니다",
//         result: result,
//       });
//     } else {
//       res.status(404).json({
//         isSuccess: false,
//         message: "최근 본 레시피가 없습니다.",
//       });
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// recipeController.put("/post", async (req, res, next) => {
//   const {
//     recipe_id,
//     user_id,
//     title,
//     thumbnail,
//     description,
//     ingredients,
//     instructions,
//   } = req.body;
//   // console.log(
//   //   recipe_id,
//   //   user_id,
//   //   title,
//   //   thumbnail,
//   //   description,
//   //   ingredients,
//   //   instructions,
//   // );
//   try {
//     const updateRecipe = {
//       recipe_id,
//       user_id,
//       title,
//       thumbnail,
//       description,
//       ingredients,
//       instructions,
//     };
//     const result = await recipeRepository.recipeModify(updateRecipe);
//     if (result) {
//       res.status(200).json({
//         is_success: true,
//         message: "레시피 수정에 성공했습니다.",
//         recipe_id,
//       });
//     }
//   } catch (e) {
//     next(e);
//   }
// });

export default recipeController;
