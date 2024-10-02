import CustomError from "../error/Error.js";
const types = ["jpg", "jpeg", "png"];

export const TypeCheck = (type) => {
  try {
    if (!types.includes(type)) {
      throw new CustomError("jpg, jpeg, png 확장자만 사용해주세요", 400);
    }
  } catch (e) {
    throw new CustomError("문제가 발생했습니다.", 500);
  }
};
