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

export const NumberType = (key, value) => {
  BlankCheck(key, value);
  if (isNaN(value)) {
    throw new CustomError(`${key}는 숫자여야 합니다.`, 400);
  }
};

export const Positive = (key, value) => {
  NumberType(key, value);
  if (value > 0) return;
  throw new CustomError(`${key}는 양수여야 합니다.`, 400);
};

export const InRange = (key, value, min, max) => {
  NumberType(key, value);
  if (min <= value && value <= max) {
    return;
  }
  throw new CustomError(`${key}는 ${min}이상 ${max}이하 입니다.`, 400);
};
