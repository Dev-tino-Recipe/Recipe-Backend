import conn from "../connection/connection.js";
import { v4 as generate_uuid } from "uuid";

export default {
  createBookmark: async ({ user_id, recipe_id }) => {
    const bookmark_id = generate_uuid();
    const bmInsert = await conn.query(
      `INSERT INTO Bookmark
        (
            bookmark_id,
            user_id,
            recipe_id    
        )
        VALUES (?, ?, ?)`,
      [bookmark_id, user_id, recipe_id],
    );
  },
};
