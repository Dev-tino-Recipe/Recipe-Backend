import express from "express";
import {
  UserNameLengthCheck,
  PasswordLengthCheck,
} from "../validator/common.js";
import { UserNameCheck } from "../validator/auth.js";
import authRepository from "../repository/authRepository.js";
import CustomError from "../error/Error.js";
import { comparePassword } from "../utils/passwordHash.js";

const authController = express.Router();

authController.post("/signup", async (req, res, next) => {
  const { user_name, password } = req.body;

  try {
    UserNameLengthCheck("userName", user_name);
    PasswordLengthCheck("password", password);

    const result = await authRepository.signUp(user_name, password);
    if (result) {
      res.status(200).json({
        is_success: true,
        message: "계정이 성공적으로 생성되었습니다.",
      });
    }
  } catch (e) {
    next(e);
  }
});

authController.post("/duplicate", async (req, res, next) => {
  try {
    const user_name = req.body;
    const user = await UserNameCheck("user_name", user_name);
    if (user.length === 0) {
      res
        .status(200)
        .json({ isSuccess: true, message: "사용가능한 아이디입니다." });
      // res.status(200).json({isSuccess:false, message:"이미 존재하는 아이디입니다."});
    }
  } catch (e) {
    next(e);
    // throw new CustomError("조회과정에서 문제가 생겼습니다.", 400);
  }
});

authController.post("/login", async (req, res, next) => {
  const { user_id, password } = req.body;

  try {
    const user = await authRepository.userByCredentials(user_id);
    if (user) {
      const isMatch = await comparePassword(password, user[0].password);

      if (isMatch) {
        req.session.loggedIn = true;
        req.session.userId = user_id;
        const sessionId = req.sessionId;
        console.log(user_id, sessionId);
        const auth = await authRepository.updateSessionId(user_id, sessionId);

        res.status(200).json({ message: "인증 성공" });
      } else {
        res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
  } catch (e) {
    next(e);
  }
});

export default authController;
