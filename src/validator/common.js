import Error from "../error/Error.js";


export const BlankCheck = (key, value) => {
    if (typeof value === 'undefined') {
        throw new Error(`${key}는 필수입니다.`, 400);
    }
}

export const LengthCheck = (key, value, min, max) => {
    try{
        BlankCheck(key, value);
        if(min > value || max < value){
            throw new Error(`${key}는 ${min}이상 ${max}이하여야 합니다.`);
        }
    }catch(e){
        throw new Error(`${key}는 ${min}이상 ${max}이하여야 합니다.`);
    }
}