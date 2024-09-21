import conn from "../connection/connection.js";
import { v4 as generate_uuid } from "uuid";
import recipeController from "../controller/recipeController.js";

export default {
  createRecipe: async ({
    user_id,
    title,
    thumbnail,
    description,
    ingredients,
    instructions,
  }) => {
    const recipe_id = generate_uuid();
    const ris = await conn.query(
      `INSERT INTO Recipes
        (
            recipe_id,
            user_id,
            title,
            thumbnail,
            description
        )
        VALUES (?, ?, ?, ?, ?)`,
      [recipe_id, user_id, title, thumbnail, description],
    );

    for (const ingredient of ingredients) {
      await conn.query(
        `INSERT INTO Ingredients
            (
                recipe_id,
                name,
                quantity
            )
            VALUES (?, ?, ?)`,
        [recipe_id, ingredient.name, ingredient.quantity],
      );
    }
    for (const instruction of instructions) {
      await conn.query(
        `INSERT INTO Instructions
            (
                recipe_id,
                title,
                img_url,
                description,
                step_order
            )
            VALUES (?, ?, ?, ?,?)`,
        [
          recipe_id,
          instruction.title,
          instruction.img_url,
          instruction.description,
          instruction.step_order,
        ],
      );
    }

    return ris;
  },

  getPostedRecipesByPaging: async (user_id, page, pageSize) => {
    const pageStr = ((page - 1) * pageSize).toString();
    const pageSizeStr = pageSize.toString();

    return await conn.query(
      `SELECT *
            FROM recipes
        WHERE user_id = ?
            ORDER BY created_at DESC
        LIMIT ?, ?;`,
      [user_id, pageStr, pageSizeStr],
    );
  },

  getRecipe: async (recipeId) => {
    const res = await conn.query(
      `SELECT title, img_url, description, step_order FROM Instructions WHERE recipe_id = ?`,
      [recipeId],
    );
    const ret = await conn.query(
      `SELECT name, quantity FROM Ingredient WHERE recipe_id = ?`,
      [recipeId],
    );
    const reu = await conn.query(
      `SELECT r.title as title, r.description as description, r.created_at as created_at, u.user_name as user_name FROM recipes as r LEFT JOIN users as u on u.user_id = r.user_id WHERE r.recipe_id = ?`,
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
  },
  getRecentRecipe : async (recipeId, placeholder) => {
    const sql = `SELECT thumbnail, title, description FROM Recipes WHERE recipe_id IN (${placeholder})`;

    const res = await conn.query(
        sql,recipeId
    );
    return res;
  }
};
