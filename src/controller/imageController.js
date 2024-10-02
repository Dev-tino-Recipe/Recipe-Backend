import express from "express";
import { upload_single } from "../aws/s3.js";
import { TypeCheck } from "../validator/image.js";
import apiResponse from "../dto/apiResponse.js";

const imageController = express.Router();

//단일업로드
imageController.post(
  "/upload/single",
  upload_single("photo"),
  (req, res, next) => {
    try {
      const fileType = req.file.originalname.split(".");
      TypeCheck(fileType[fileType.length - 1]);
      res
        .status(200)
        .json(
          apiResponse.success({
            message: "upload was successful",
            location: req.file.location,
          }),
        );
    } catch (e) {
      next(e);
    }
  },
);

// imageController.post('/upload/multi', (req, res, next) => {
//
// });

export default imageController;
