import {conn} from "../db/connection.js";

export default {
  async save(recipeId, name, quantity, connection) {
    await conn.query(
        "insert into ingredient (recipeId, name, quantity) values (?, ? ,?)",
        [recipeId, name, quantity],
        connection
    );
  }
}