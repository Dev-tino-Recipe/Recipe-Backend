import express from "express";
import {UserNameLengthCheck, PasswordLengthCheck} from "../validator/common.js";
import {UserNameCheck} from "../validator/auth.js";
import authRepository from "../repository/authRepository.js";
import CustomError from "../error/Error.js";

const bookmarkController = express.Router();

bookmarkController.post('/regist', async (req, res,next) => {
   try{

   } catch(e){
       next(e);
   }
});


export default bookmarkController;