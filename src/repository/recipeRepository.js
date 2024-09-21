import conn from "../connection/connection.js";
import { v4 as generate_uuid } from "uuid";

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
    console.log(
      user_id,
      title,
      thumbnail,
      description,
      ingredients,
      instructions,
    );
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

    const ingredientValues = ingredients
      .map(
        (ingredient) =>
          `(${conn.escape(recipe_id)}, ${conn.escape(ingredient.name)}, ${conn.escape(ingredient.quantity)})`,
      )
      .join(", ");

    await conn.query(`
        INSERT INTO Ingredients (recipe_id, name, quantity)
        VALUES ${ingredientValues}
    `);

    const instructionValues = instructions
      .map(
        (instruction) =>
          `(${conn.escape(recipe_id)}, ${conn.escape(instruction.title)}, ${conn.escape(instruction.img_url)}
          ,${conn.escape(instruction.description)}, ${conn.escape(instruction.step_order)})`,
      )
      .join(", ");

    await conn.query(`
        INSERT INTO Instructions (recipe_id, title, img_url, description, step_order)
        VALUES ${instructionValues}
    `);

    return ris;
  },

  getPostedRecipesByPaging: async (user_id, page, pageSize) => {
    const skipSizeStr = (page - 1) * pageSize.toString();
    const pageSizeStr = pageSize.toString();

    return await conn.query(
      `SELECT *
            FROM recipes
        WHERE user_id = ?
            ORDER BY created_at DESC
        LIMIT ?, ?;`,
      [user_id, skipSizeStr, pageSizeStr],
    );
  },

  getRecipe: async (recipeId) => {
    const res = await conn.query(
      `SELECT title, img_url, description, step_order FROM Instructions WHERE recipeId = ?`,
      [recipeId],
    );
    const ret = await conn.query(
      `SELECT name, quantity FROM Ingredient WHERE recipeId = ?`,
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
};
