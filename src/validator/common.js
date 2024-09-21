import CustomError from "../error/Error.js";

export const BlankCheck = (key, value) => {
  try {
  } catch (e) {}
  if (typeof value === "undefined") {
    throw new CustomError(`${key}는 필수입니다.`, 400);
  }
};

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

export const PasswordLengthCheck = (key, value) => {
  try {
    BlankCheck(key, value);
    if (8 > value.length || 15 < value.length) {
      throw new Error(`${key}는 8이상 15이하여야 합니다.`);
    }
  } catch (e) {
    throw new Error(`${key}는 8이상 15이하여야 합니다.`);
  }
};

export const TitleLengthCheck = (key, value) => {
  try {
    BlankCheck(key, value);
    if (2 > value.length || 20 < value.length) {
      throw new Error(`${key}는 2이상 20이하여야 합니다.`);
    }
  } catch (e) {
    throw new Error(`${key}는 2이상 20이하여야 합니다.`);
  }
};

export const DescriptionLengthCheck = (key, value) => {
  try {
    BlankCheck(key, value);
    if (10 > value.length || 50 < value.length) {
      throw new Error(`${key}는 10이상 50이하여야 합니다.`);
    }
  } catch (e) {
    throw new Error(`${key}는 10이상 50이하여야 합니다.`);
  }
};

export const NameLengthCheck = (key, value) => {
  try {
    BlankCheck(key, value);
    if (1 > value.length || 20 < value.length) {
      throw new Error(`${key}는 1이상 20이하여야 합니다.`);
    }
  } catch (e) {
    throw new Error(`${key}는 1이상 20이하여야 합니다.`);
  }
};

export const QuantityLengthCheck = (key, value) => {
  try {
    BlankCheck(key, value);
    if (2 > value.length || 20 < value.length) {
      throw new Error(`${key}는 2이상 20이하여야 합니다.`);
    }
  } catch (e) {
    throw new Error(`${key}는 2이상 20이하여야 합니다.`);
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
