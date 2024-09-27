import express from "express";
import {validPassword, validUsername} from "../validator/auth.js";
import userRepository from "../repository/userRepository.js";
import apiResponse from "../dto/apiResponse.js";
import {BlankCheck} from "../validator/common.js";
import userConverter from "../dto/userConverter.js";

const authController = express.Router();

authController.post("/signup", async (req, res, next) => {
  const {username, password} = req.body;

  try {
    await validUsername("username", username)
    validPassword("password", password);

    await userRepository.save(username, password);

    res.status(200).json(
        apiResponse.success({
          message: "계정이 성공적으로 생성되었습니다."
        })
    );
  } catch (e) {
    next(e);
  }
});

authController.get("/user", async (req, res, next) => {
  res.json(
      apiResponse.success({
        message: "",
        result: {user: userConverter.toUserDetail(req.session.user)}
      })
  );
})

authController.post("/duplicate", async (req, res, next) => {
  try {
    const {username} = req.body;
    await validUsername('username', username)
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
  const {username, password} = req.body;

  try {
    BlankCheck("username", username);
    BlankCheck("password", password);
    const findUser = await userRepository.findByUsernameAndPassword(username, password);

    // 로그인 정보가 없다면
    if (!findUser) {
      return res.status(401).json(
          apiResponse.failure({message: "아디이 혹은 비밀번호가 잘못 되었습니다."})
      );
    }

    // 로그인 성공 로직 => 세션에 로그인 정보 저장, 세션 아이디 업데이트
    req.session.loggedIn = true;
    req.session.user = findUser;
    await userRepository.updateSessionIdByUserId(findUser.userId, req.sessionID);

    res.status(200).json(
        apiResponse.success({
          message: "인증 성공",
          result: {
            userId: findUser.userId
          }
        })
    );
  } catch (e) {
    next(e);
  }
});

authController.post("/logout", async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({message: "로그인하지 않은 사용자입니다."});
    }
    await userRepository.clearSessionId(userId);

    await req.session.destroy();

    res.status(200).json(
        apiResponse.success({message: "로그아웃 성공"})
    );
  } catch (e) {
    next(e);
  }
});

export default authController;
