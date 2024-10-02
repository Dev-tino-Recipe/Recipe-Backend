import conn from "../db/connection.js";

export default {
  async findByRecipeIdAndUserId(recipeId, userId) {
    const findBookMarks = await conn.query(
      `
        SELECT *
        from bookmark
        where recipeId = ?
          and userId = ?
    `,
      [recipeId, userId],
    );

    return findBookMarks[0];
  },

  createBookmark: async (user_id, recipe_id) => {
    const insertBookmark = await conn.query(
      `INSERT INTO Bookmark
        (
            userId,
            recipeId
        )
        VALUES (?, ?)`,
      [user_id, recipe_id],
    );
    return insertBookmark.affectedRows;
  },
  deleteBookmark: async (user_id, recipe_id) => {
    const delBookmark = await conn.query(
      `DELETE FROM Bookmark WHERE userId = ? AND recipeId = ?`,
      [user_id, recipe_id],
    );
    return delBookmark;
  },
};
