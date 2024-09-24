import express from "express";
import {duplicateUsername, validPassword, validUsername} from "../validator/auth.js";
import userRepository from "../repository/userRepository.js";
import apiResponse from "../dto/apiResponse.js";

const authController = express.Router();

authController.post("/signup", async (req, res, next) => {
  const {username, password} = req.body;

  try {
    await validUsername("username", username)
    validPassword("password", password);

    await userRepository.createUser(username, password);

    res.status(200).json(
        apiResponse.success({
          message: "계정이 성공적으로 생성되었습니다."
        })
    );
  } catch (e) {
    next(e);
  }
});

authController.post("/duplicate", async (req, res, next) => {
  try {
    const {username} = req.body;
    await duplicateUsername('username', username)
    res
        .status(200)
        .json(
            apiResponse.success({message: "사용 가능한 유저 이름입니다."})
        );
  } catch (e) {
    next(e);
  }
});

authController.post("/login", async (req, res, next) => {
  const {user_name, password} = req.body;

  try {
    const users = await authRepository.userByCredentials(user_name);
    const user = users.length > 0 ? users[0] : null;
    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        req.session.loggedIn = true;
        req.session.userId = user.user_id;

        const sessionId = req.sessionID;
        await authRepository.updateSessionId(user.user_id, sessionId);

        res.status(200).json({message: "인증 성공"});
      } else {
        res.status(401).json({message: "비밀번호가 일치하지 않습니다."});
      }
    } else {
      res.status(404).json({message: "사용자를 찾을 수 없습니다."});
    }
  } catch (e) {
    next(e);
  }
});

authController.post("/logout", async (req, res, next) => {
  try {
    const currentUserId = req.session.userId;

    if (!currentUserId) {
      return res.status(401).json({message: "로그인하지 않은 사용자입니다."});
    }
    await authRepository.clearUserSessionId(currentUserId);

    await req.session.destroy();

    res.clearCookie("session_cookie_name", {path: "/"});

    res.status(200).json({message: "로그아웃 성공"});
  } catch (e) {
    next(e);
  }
});

export default authController;
