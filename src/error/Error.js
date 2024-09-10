export default class CustomError extends Error {
    static BAD_REQUEST = new CustomError("BAD REQUEST.", 400);

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}