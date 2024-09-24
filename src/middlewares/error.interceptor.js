import CustomError from "../error/Error.js";

export default (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { status, message } = err;
    res.status(status).json({ message: message });
  }
  console.log(err);
  res.status(500).send({ message: "서버 오류" });
  next();
};
