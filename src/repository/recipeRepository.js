import conn from "../db/connection.js";
import { v4 as uuid } from "uuid";
import connection from "../db/connection.js";

export default {
  save: async (userId, title, thumbnail, description, connection) => {
    const recipeId = uuid();

    const recipeSql = `
        INSERT INTO recipes
            (recipeId, userId, title, thumbnail, description)
        values (?, ?, ?, ?, ?)
    `;

    await conn.query(
      recipeSql,
      [recipeId, userId, title, thumbnail, description],
      connection,
    );

    return recipeId;
  },

  findByUserId: async (userId, page, pageSize, connection) => {
    const skipStr = ((page - 1) * pageSize).toString();
    const pageSizeStr = pageSize.toString();

    const sql = `
        SELECT *
        FROM recipes
        WHERE userId = ?
        ORDER BY createdAt DESC
        LIMIT ?, ?;
    `;

    return await conn.query(sql, [userId, skipStr, pageSizeStr], connection);
  },

  findById: async (recipeId, connection) => {
    const recipeSql = `
        select *
        from recipes
        where recipeId = ?
    `;
    return (await conn.query(recipeSql, [recipeId], connection))[0];
  },
  update: async (recipeId, title, thumbnail, description, connection) => {
    const updateRecipeSql = `
        UPDATE recipes
        SET title = ?, thumbnail = ?, description = ?, updatedAt = CURRENT_TIMESTAMP()
        WHERE recipeId = ?;
    `;

    await conn.query(
      updateRecipeSql,
      [title, thumbnail, description, recipeId],
      connection,
    );
  },

  findBookmarkRecipes: async (userId, page, pageSize, connection) => {
    const skipStr = ((page - 1) * pageSize).toString();
    const pageSizeStr = pageSize.toString();

    const recipeSql = `
        SELECT r.recipeId , r.title, r.thumbnail, r.description, r.updatedAt 
        FROM recipes as r 
        LEFT JOIN bookmark as b on b.recipeId = r.recipeId 
        WHERE b.userId = ?
        LIMIT ?, ?;
    `;
    return await conn.query(
      recipeSql,
      [userId, skipStr, pageSizeStr],
      connection,
    );
  },
  findByRecipeTitle: async (page, pageSize, keyword) => {
    keyword = "%" + keyword + "%";
    console.log(keyword);
    const pageStart = ((page - 1) * pageSize).toString();

    return await conn.query(
      `SELECT 
            recipeId, 
            thumbnail, 
            title, 
            description,
            updatedAt 
            FROM recipes 
            WHERE title like ?
            LIMIT ?, ?;
            `,
      [keyword, pageStart, pageSize],
    );
  },
};
