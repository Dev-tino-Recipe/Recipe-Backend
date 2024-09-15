import Error from "../error/Error.js";
const types = ["jpg", "jpeg", "png"];

export const TypeCheck = (type) =>{
    try {
        if (!types.includes(type)){
            return new Error('jpg, jpeg, png 확장자만 사용해주세요', 500)
        }
    }catch(e){
        throw new Error('문제가 발생했습니다.', 500)
    }
}