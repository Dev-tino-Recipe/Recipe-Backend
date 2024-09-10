import express from "express";
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// app.use((err, req, res, next) => {
//     if (err instanceof CustomError) {
//         const {status, message} = err
//         res.status(status).json({message: message});
//     }
//     console.log(err);
//     res.status(500).send({message:'서버 오류'});
//     next();
// });
app.listen(4000, async () => {

    console.log("Server is running on port 4000...");
});