import express from "express";
import {LengthCheck} from "../validator/common.js";
import {UserNameCheck} from "../validator/auth.js";
import CustomError from "../error/Error.js";
import {upload} from "../imgServer/app.js";

const recipeController = express.Router();

recipeController.post("/regist", upload.single('image'), async (req, res, next) => {
    try{
        const data = req.file;
        console.log(req);
        // throw new CustomError("레시피 등록과정에 문제가 생겼습니다.", 400);
    }catch(e){
        next(e);
    }
});


export default recipeController;