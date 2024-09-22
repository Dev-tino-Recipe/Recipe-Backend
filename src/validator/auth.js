import { BlankCheck } from "./common.js";
import authRepository from "../repository/authRepository.js";
import CustomError from "../error/Error.js";

export const UserNameCheck = async (key, value) => {
  try {
    BlankCheck(key, value);
    const check = await authRepository.findByUserName(value);
    if (check.length > 0) {
      throw new CustomError("해당 아이디는 이미 존재합니다.");
    }
  } catch (e) {
    throw new CustomError("해당 아이디는 이미 존재합니다.");
  }
};

export const FindUserByUserId = async (key, value) => {
  try {
    const check = await authRepository.findByUserId(value);
    if (check.length === 0) {
      return new CustomError("해당 유저는 존재하지 않습니다.", 500);
    }
  } catch (e) {
    throw new CustomError("유저를 조회하는 과정에 문제가 발생했습니다.", 500);
  }
};
