import conn from "../db/connection.js";

export default {
  async save(recipeId, title, description, imgUrl, stepOrder, connection) {
    await conn.query(
        `insert into instructions (recipeId, title, description, imgUrl, stepOrder)
         values (?, ?, ?, ?, ?);`,
        [recipeId, title, description, imgUrl, stepOrder],
        connection
    );
  },

  async findByRecipeId(recipeId, connection) {
    return conn.query(
        "select * from instructions where recipeId = ? order by stepOrder",
        [recipeId],
        connection
    );
  }
}