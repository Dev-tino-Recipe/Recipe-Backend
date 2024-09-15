import express from "express";
import logger from 'morgan';
import authController from "./src/controller/authController.js";
import recipeController from "./src/controller/recipeController.js";
import imageController from "./src/controller/imageController.js";
import CustomError from "./src/error/Error.js";
import bookmarkController from "./src/controller/bookmarkController.js";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authController);
app.use('/api/recipe', recipeController);
app.use('/api/img', imageController);
app.use('/api/bookmark', bookmarkController);


app.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        const {status, message} = err
        res.status(status).json({message: message});
    }
    console.log(err);
    res.status(500).send({message:'서버 오류'});
    next();
});
app.listen(4000, async () => {

    console.log("Server is running on port 4000...");
});