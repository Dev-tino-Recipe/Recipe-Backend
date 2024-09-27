import express from "express";
import bookmarkRepository from "../repository/bookmarkRepository.js";
import {returnResponse} from "../utils/response.js";

const bookmarkController = express.Router();

// bookmarkController.post("/regist", async (req, res, next) => {
//   const { user_id, recipe_id } = req.body;
//   try {
//     const insert = await bookmarkRepository.createBookmark(user_id, recipe_id);
//     if (insert.affectedRows) {
//       res
//         .status(200)
//         .json({ is_Success: true, message: "북마크 등록에 성공했습니다." });
//     }
//   } catch (e) {
//     next(e);
//   }
// });
//
// bookmarkController.delete("/delete", async (req, res, next) => {
//   const { user_id, recipe_id } = req.body;
//   try {
//     const del = await bookmarkRepository.deleteBookmark(user_id, recipe_id);
//     if (del.affectedRows) {
//       res.status(200).json(
//         returnResponse({
//           success: true,
//           message: "북마크 삭제에 성공했습니다.",
//         }),
//       );
//     } else {
//       res
//         .status(400)
//         .json(returnResponse(false, "북마크 삭제에 실패했습니다."));
//     }
//   } catch (e) {
//     next(e);
//   }
// });

export default bookmarkController;
