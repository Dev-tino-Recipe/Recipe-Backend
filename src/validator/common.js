import CustomError from "../error/Error.js";

export const BlankCheck = (key, value) => {
  if (typeof value === "undefined" || value === null || value === "") {
    throw new CustomError(`${key}는 필수입니다.`, 400);
  }
};

export const LengthCheck = (key, value, min, max) => {
  BlankCheck(key, value);
  if (min <= value.length && value.length <= max) {
    return;
  }
  throw new CustomError(`${key}는 ${min}이상 ${max}이하 입니다.`, 400);
}

export const UserNameLengthCheck = (key, value) => {
  try {
    BlankCheck(key, value);
    if (4 > value.length || 12 < value.length) {
      throw new CustomError(`${key}는 4이상 12이하여야 합니다.`);
    }
  } catch (e) {
    throw new CustomError(`${key}는 4이상 12이하여야 합니다.`);
  }
};

export const NumberType = (key, value) => {
  try {
    BlankCheck(key, value);
    if (isNaN(value)) {
      throw new Error(`${key}는 숫자여야 합니다.`, 400);
    }
  } catch (e) {
    throw new Error(`${key}는 숫자여야 합니다.`, 400);
  }
};

export const Positive = (key, value) => {
  try {
    NumberType(key, value);
    if (value >= 1) return;
    throw new Error(`${key}는 양수여야 합니다.`, 400);
  } catch (e) {
    throw new Error(`${key}는 양수여야 합니다.`, 400);
  }
};

export const InRange = (key, value, min, max) => {
  try {
    NumberType(key, value);
    if (min <= value && value <= max) {
      return;
    }
    throw new Error(`${key}는 ${min}이상 ${max}이하 입니다.`, 400);
  } catch (e) {
    throw new Error(`${key}는 ${min}이상 ${max}이하 입니다.`, 400);
  }
};
