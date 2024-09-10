import express from "express";
import {LengthCheck} from "../validator/common.js";
import {UserNameCheck} from "../validator/auth.js";
import authRepository from "../repository/authRepository.js";
import CustomError from "../error/Error.js";

const authController = express.Router();

authController.get("/login", (  req, res, next) => {
    try{

    }catch(e){
        next(e);
    }
});

authController.post("/signup", async (req, res, next) => {
    const {user_name, password} = req.body;

    try {
        LengthCheck('user_name',
            user_name,
            process.env.USER_NAME_MIN_LENGTH,
            process.env.USER_NAME_MAX_LENGTH);
        LengthCheck('password',
            password,
            process.env.PASSWORD_MIN_LENGTH,
            process.env.PASSWORD_MAX_LENGTH);

        const result = await authRepository.singUp(user_name, password);
        if(result){
            res.status(200).json({is_success:true ,message: "계정이 성공적으로 생성되었습니다."});
        }
    } catch (e) {
        next(e);
    }
});

authController.post("/duplicate", async (req, res, next) => {
    try {
        const user_name = req.body;
        const user = await UserNameCheck("user_name", user_name);
        if(user.length===0){
            res.status(200).json({isSuccess:true, message:"사용가능한 아이디입니다."});
            // res.status(200).json({isSuccess:false, message:"이미 존재하는 아이디입니다."});
        }
    }catch(e){
        next(e);
        // throw new CustomError("조회과정에서 문제가 생겼습니다.", 400);
    }
});


export default authController;