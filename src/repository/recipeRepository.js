import conn, {transaction} from "../db/connection.js";
import {v4 as uuid} from "uuid";

export default {
  save: async (
      userId,
      title,
      thumbnail,
      description,
      connection
  ) => {
    const recipeId = uuid();

    const recipeSql = `
        INSERT INTO recipes
            (recipeId, userId, title, thumbnail, description)
        values (?, ?, ?, ?, ?)
    `

    await conn.query(recipeSql, [recipeId, userId, title, thumbnail, description], connection);

    return recipeId;
  },

  findByUserId: async (userId, page, pageSize) => {
    const skipStr = ((page - 1) * pageSize).toString();
    const pageSizeStr = pageSize.toString();

    const sql = `
        SELECT *
        FROM recipes
        WHERE userId = ?
        ORDER BY createdAt DESC
        LIMIT ?, ?;
    `

    return await conn.query(sql, [userId, skipStr, pageSizeStr]);
  },

  findById: async (recipeId) => {
    const instructionsSql = `
        SELECT title, imgUrl, description, stepOrder
        FROM instructions
        WHERE recipeId = ?
    `
    const findInstructions = await conn.query(instructionsSql, [recipeId]);

    const ingredientSql = `
        SELECT name, quantity
        FROM ingredient
        WHERE recipeId = ?
        order by name
    `
    const findIngredients = await conn.query(ingredientSql, [recipeId]);

    const recipeSql = `
        select *
        from recipes
        where recipeId = ?
    `
    const findRecipe = await conn.query(recipeSql, [recipeId]);

    const findUser = await conn.query(`
    
    `);


    const reu = await conn.query(
        `SELECT r.title as title, r.description as description, r.created_at as created_at, u.user_name as user_name
         FROM recipes as r
                  LEFT JOIN users as u on u.user_id = r.user_id
         WHERE r.recipe_id = ?`,
        [recipeId],
    );

    return {
      recipeDetails: {
        title: reu[0].title,
        description: reu[0].description,
        created_at: reu[0].created_at,
        user: {
          user_name: reu[0].user_name,
        },
      },
      instructions: res.map((row) => ({
        title: row.title,
        imgUrl: row.img_url,
        description: row.description,
        step_order: row.step_order,
      })),
      ingredients: ret.map((row) => ({
        name: row.name,
        quantity: row.quantity,
      })),
    };
  }


  // recipeModify: async ({
  //                        recipe_id,
  //                        title,
  //                        thumbnail,
  //                        description,
  //                        ingredients,
  //                        instructions,
  //                      }) => {
  //   const ru = await conn.query(
  //       `UPDATE Recipes
  //        SET title       = ?,
  //            thumbnail   = ?,
  //            description = ?,
  //            updated_at  = CURRENT_TIMESTAMP()
  //        where recipe_id = ?;`,
  //       [title, thumbnail, description, recipe_id],
  //   );
  //   await conn.query(
  //       `DELETE
  //        FROM ingredient
  //        WHERE recipe_id = ?;`,
  //       [recipe_id],
  //   );
  //
  //   await conn.query(
  //       `DELETE
  //        FROM instructions
  //        WHERE recipe_id = ?;`,
  //       [recipe_id],
  //   );
  //
  //   for (const ingredient of ingredients) {
  //     await conn.query(
  //         `
  //             INSERT INTO Ingredient
  //             (recipe_id,
  //              name,
  //              quantity)
  //             VALUES (?, ?, ?)
  //         `,
  //         [recipe_id, ingredient.name, ingredient.quantity],
  //     );
  //   }
  //
  //   for (const instruction of instructions) {
  //     await conn.query(
  //         `
  //             INSERT INTO Instructions
  //             (recipe_id,
  //              title,
  //              img_url,
  //              description,
  //              step_order)
  //             VALUES (?, ?, ?, ?, ?)
  //         `,
  //         [
  //           recipe_id,
  //           instruction.title,
  //           instruction.img_url,
  //           instruction.description,
  //           instruction.step_order,
  //         ],
  //     );
  //   }
  //   return ru;
  // },


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
