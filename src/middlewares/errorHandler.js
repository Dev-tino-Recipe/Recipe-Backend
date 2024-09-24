import CustomError from "../error/Error.js";
import apiResponse from "../dto/apiResponse.js";

export default (err, req, res, next) => {
  if (err instanceof CustomError) {
    const {status, message} = err;
    return res.status(status).json(
        apiResponse.failure({message})
    );
  }

  console.log(err);

  res.status(500).json(
      apiResponse.failure({message: "서버 오류"})
  );
};
