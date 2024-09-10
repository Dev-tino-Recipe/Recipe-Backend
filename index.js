import express from "express";
import logger from 'morgan';
import authController from "./src/controller/authController";
import recipeController from "./src/controller/recipeController";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authController);
app.use('/api/recipe', recipeController);


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