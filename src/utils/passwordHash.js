import bcrypt from "bcrypt";
// 비밀번호 해싱
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (e) {
    console.log("error hash", e);
    throw e;
  }
};
// 비교 함수
export const comparePassword = async (password, hashPW) => {
  try {
    return await bcrypt.compare(password, hashPW);
  } catch (e) {
    console.log("error compare PW", e);
    throw e;
  }
};
