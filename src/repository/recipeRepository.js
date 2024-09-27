import conn from "../db/connection.js";
import { v4 as uuid } from "uuid";

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

    // const findUser = await conn.query(`
    //
    // `);
    //
    //
    // const reu = await conn.query(
    //     `SELECT r.title as title, r.description as description, r.created_at as created_at, u.user_name as user_name
    //      FROM recipes as r
    //               LEFT JOIN users as u on u.user_id = r.user_id
    //      WHERE r.recipe_id = ?`,
    //     [recipeId],
    // );

    // return {
    //   recipeDetails: {
    //     title: reu[0].title,
    //     description: reu[0].description,
    //     created_at: reu[0].created_at,
    //     user: {
    //       user_name: reu[0].user_name,
    //     },
    //   },
    //   instructions: res.map((row) => ({
    //     title: row.title,
    //     imgUrl: row.img_url,
    //     description: row.description,
    //     step_order: row.step_order,
    //   })),
    //   ingredients: ret.map((row) => ({
    //     name: row.name,
    //     quantity: row.quantity,
    //   })),
    // };
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

  // getRecipe: async (recipeId) => {
  //   const res = await conn.query(
  //       `SELECT title, img_url, description, step_order
  //        FROM Instructions
  //        WHERE recipe_id = ?`,
  //       [recipeId],
  //   );
  //   const ret = await conn.query(
  //       `SELECT name, quantity
  //        FROM Ingredient
  //        WHERE recipe_id = ?`,
  //       [recipeId],
  //   );
  //   const reu = await conn.query(
  //       `SELECT r.title as title, r.description as description, r.created_at as created_at, u.user_name as user_name
  //        FROM recipes as r
  //                 LEFT JOIN users as u on u.user_id = r.user_id
  //        WHERE r.recipe_id = ?`,
  //       [recipeId],
  //   );
  //
  //   return {
  //     recipeDetails: {
  //       title: reu[0].title,
  //       description: reu[0].description,
  //       created_at: reu[0].created_at,
  //       user: {
  //         user_name: reu[0].user_name,
  //       },
  //     },
  //     instructions: res.map((row) => ({
  //       title: row.title,
  //       imgUrl: row.img_url,
  //       description: row.description,
  //       step_order: row.step_order,
  //     })),
  //     ingredients: ret.map((row) => ({
  //       name: row.name,
  //       quantity: row.quantity,
  //     })),
  //   };
  // },
  // getRecentRecipe: async (recipeId, placeholder) => {
  //   const sql = `SELECT thumbnail, title, description
  //                FROM Recipes
  //                WHERE recipe_id IN (${placeholder})`;
  //
  //   const res = await conn.query(sql, recipeId);
  //   return res;
  // },
};
