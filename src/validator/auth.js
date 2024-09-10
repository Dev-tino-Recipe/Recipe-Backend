import {BlankCheck} from "./common.js";
import authRepository from "../repository/authRepository.js";
import CustomError from "../error/Error.js";

export const UserNameCheck = async(key, value) => {
    try {
        BlankCheck(key, value);
        const check = await authRepository.findByUserName(value);
        if(check.length>0){
            throw new CustomError("해당 아이디는 이미 존재합니다.");
        }
    }catch(e){
        throw new CustomError("해당 아이디는 이미 존재합니다.");

    }

}