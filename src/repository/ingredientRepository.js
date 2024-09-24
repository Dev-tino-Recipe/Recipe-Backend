import conn from "../db/connection.js";

export default {
  async save(recipeId, name, quantity, connection) {
    await conn.query(
        "insert into ingredient (recipeId, name, quantity) values (?, ? ,?)",
        [recipeId, name, quantity],
        connection
    );
  },

  async findByRecipeId(recipeId, connection) {
    return conn.query(
        "select * from ingredient where recipeId = ? order by name",
        [recipeId],
        connection
    );
  }
}