import {BlankCheck, LengthCheck} from "./common.js";
import CustomError from "../error/Error.js";

export const validRecipeTitle = (key, value) => {
  try {
    BlankCheck(key, value);
    LengthCheck(key, value, 2, 20);
  } catch (e) {
    throw new CustomError(`${key}는 2이상 20이하여야 합니다.`, 400);
  }
};

export const validRecipeDescription = (key, value) => {
  try {
    BlankCheck(key, value);
    LengthCheck(key, value, 10, 50);
  } catch (e) {
    throw new CustomError(`${key}는 10이상 50이하여야 합니다.`, 400);
  }
};

export const validRecipeIngredients = (key, value) => {
  if (!Array.isArray(value)) {
    throw new CustomError(`${key}는 배열이어야 합니다.`, 400);
  }

  value.forEach((ingredient, index) => {
    const {name, quantity} = ingredient;
    BlankCheck(`${key}[${index}].name`, name);
    LengthCheck(`${key}[${index}].name`, name, 2, 20);
    BlankCheck(`${key}[${index}].quantity`, quantity);
    LengthCheck(`${key}[${index}].quantity`, quantity, 2, 20);
  })
}



export const validRecipeInstructions = (key, value) => {
  if (!Array.isArray(value)) {
    throw new CustomError(`${key}는 배열이어야 합니다.`, 400);
  }

  value.forEach((instruction, index) => {
    const {title, description, imgUrl} = instruction;
    BlankCheck(`${key}[${index}].title`, title);
    LengthCheck(`${key}[${index}].title`, title, 2, 20);

    BlankCheck(`${key}[${index}].description`, description);
    LengthCheck(`${key}[${index}].description`, description, 10, 50);

    BlankCheck(`${key}[${index}].imgUrl`, imgUrl);
  })
}