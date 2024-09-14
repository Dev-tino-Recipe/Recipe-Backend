import express, {response} from "express";
import {LengthCheck} from "../validator/common.js";
import {UserNameCheck} from "../validator/auth.js";
import CustomError from "../error/Error.js";
import {upload} from "../imgServer/app.js";
import recipeRepository from "../repository/recipeRepository";

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

recipeController.get("/detail/:recipeId", async (req,res,next) => {
    try{
        const {recipeId} = req.params;
        const result = await recipeRepository.getRecipe(recipeId);
        if(result.length){
            res.status(200).json({isMine: false, isBookMarked: true, isSuccess: true, message: "상세 레시피가 정상 조회되었습니다.", result:result});
        }else{
            res.status(400).json({message:"레시피가 없습니다.", result:result})
        }


    }catch (e){
        next(e);
    }
});

recipeController.post("/recipe/recent", async (req, res, next) => {
    try{

    }catch (e) {
        next(e);
    }
});


export default recipeController;