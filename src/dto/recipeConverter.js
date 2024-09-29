import userConverter from "./userConverter.js";
import userRepository from "../repository/userRepository.js";
import ingredientRepository from "../repository/ingredientRepository.js";
import instructionRepository from "../repository/instructionRepository.js";
import bookmarkRepository from "../repository/bookmarkRepository.js";

export default {
  async toRecipeDetail(recipe) {
    const findUser = await userRepository.findById(recipe.userId);
    const isBookMarked = !!await bookmarkRepository.findByRecipeIdAndUserId(recipe.recipeId, findUser.userId)
    const findIngredients = await ingredientRepository.findByRecipeId(recipe.recipeId);
    const findInstructions = await instructionRepository.findByRecipeId(recipe.recipeId);

    return {
      recipe,
      isBookMarked,
      user: userConverter.toUserDetail(findUser),
      ingredients: findIngredients,
      instructions: findInstructions,
    }
  }
}