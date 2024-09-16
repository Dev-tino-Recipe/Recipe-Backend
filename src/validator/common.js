import Error from "../error/Error.js";

export const BlankCheck = (key, value) => {
  if (typeof value === "undefined") {
    throw new Error(`${key}는 필수입니다.`, 400);
  }
};

export const UserNameLengthCheck = (key, value) => {
  try {
    BlankCheck(key, value);
    if (4 > value || 12 < value) {
      throw new Error(`${key}는 4이상 12이하여야 합니다.`);
    }
  } catch (e) {
    throw new Error(`${key}는 4이상 12이하여야 합니다.`);
  }
};

export const PasswordLengthCheck = (key, value) => {
  try {
    BlankCheck(key, value);
    if (8 > value || 15 < value) {
      throw new Error(`${key}는 8이상 15이하여야 합니다.`);
    }
  } catch (e) {
    throw new Error(`${key}는 8이상 15이하여야 합니다.`);
  }
};
