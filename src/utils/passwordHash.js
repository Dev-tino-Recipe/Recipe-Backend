// import crypto from 'crypto';
//
// export const hashPassword = (password) => {
//     const salt = crypto.randomBytes(16).toString('hex');
//
//     const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
//
//     return  hash;
// }

import bcrypt from "bcrypt";
// 비밀번호 해싱
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (e) {
    console.log("error hash", e);
    throw e;
  }
};
// 비교 함수
export const comparePassword = async (password, hashPW) => {
  try {
    const match = await bcrypt.compare(password, hashPW);
    return match;
  } catch (e) {
    console.log("error compare PW", e);
    throw e;
  }
};
