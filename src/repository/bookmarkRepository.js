import conn from "../db/connection.js";

export default {
  async findByRecipeIdAndUserId(recipeId, userId, connection) {
    const findBookMarks = await conn.query(`
        SELECT *
        from bookmark
        where recipeId = ?
          and userId = ?
    `, [recipeId, userId], connection)

    return findBookMarks[0];
  }

  // createBookmark: async (user_id, recipe_id) => {
  //   const bookmark_id = generate_uuid();
  //   const insertBookmark = await conn.query(
  //     `INSERT INTO Bookmark
  //       (
  //           bookmark_id,
  //           user_id,
  //           recipe_id
  //       )
  //       VALUES (?, ?, ?)`,
  //     [bookmark_id, user_id, recipe_id],
  //   );
  //   return insertBookmark;
  // },
  // deleteBookmark: async (user_id, recipe_id) => {
  //   const delBookmark = await conn.query(
  //     `DELETE FROM Bookmark WHERE user_id = ? AND recipe_id = ?`,
  //     [user_id, recipe_id],
  //   );
  //   return delBookmark;
  // },
};
