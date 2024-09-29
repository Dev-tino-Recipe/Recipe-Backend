import dotenv from "dotenv";
import {pbkdf2Sync} from "crypto";


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const hash = async (value) => {
  try {
    return pbkdf2Sync(
        value, SECRET_KEY,
        100000, 64, "sha256"
    ).toString('base64');
  } catch (e) {
    console.log("해시중 오류 발생", e);
    throw e;
  }
};
// 비교 함수
export const compareHash = async (source, hashed) => {
  try {
    return hashed === pbkdf2Sync(
        source, SECRET_KEY,
        100000, 64, "sha256"
    ).toString('base64');

  } catch (e) {
    console.log("해시 비교중 오류 발생", e);
    throw e;
  }
};
