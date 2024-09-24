import { BlankCheck } from "./common.js";
import authRepository from "../repository/authRepository.js";
import CustomError from "../error/Error.js";

export const UserNameCheck = async (key, value) => {
  BlankCheck(key, value);
  const findUser = await authRepository.findByUserName(value);
  if (findUser) {
    throw new CustomError("이미 존재하는 유저 이름입니다.", 400);
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
