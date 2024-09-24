import {BlankCheck, LengthCheck} from "./common.js";
import CustomError from "../error/Error.js";
import userRepository from "../repository/userRepository.js";

export const duplicateUsername = async (key, username) => {
  BlankCheck(key, username);
  const findUser = await userRepository.findByUsername(username);
  if (findUser) {
    throw new CustomError("이미 존재하는 유저 이름입니다.", 400);
  }
}

export const validUsername = async (key, username) => {
  try {
    BlankCheck(key, username);
    LengthCheck(key, username, 4, 12);
  } catch (e) {
    throw new CustomError(`${key} 은 4이상 12이하여야 합니다.`, 400);
  }

  await duplicateUsername(key, username);
}

export const validPassword = (key, password) => {
  try {
    BlankCheck(key, password);
    LengthCheck(key, password, 8, 15);
  } catch (e) {
    throw new CustomError(`${key}는 8이상 15이하여야 합니다.`, 400);
  }
}

export const validUserId = async (key, userId) => {
  const findUser = await userRepository.findById(userId);
  if (!findUser) {
    throw new CustomError("해당 유저는 존재하지 않습니다.", 400);
  }
}
