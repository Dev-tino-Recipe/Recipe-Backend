export default {
  users: `
      CREATE TABLE IF NOT EXISTS users
      (
          userId    char(36) PRIMARY KEY,
          username  varchar(12)  not null unique,
          password  varchar(100) not null,
          sessionId char(100)             default null,
          createdAt timestamp    not null default current_timestamp()
      );
  `,

  recipes: `
      CREATE TABLE IF NOT EXISTS recipes
      (
          recipeId    char(36)  not null PRIMARY KEY,
          userId      char(36)  not null REFERENCES users (userId),
          title       TEXT      not null,
          thumbnail   TEXT      not null,
          description TEXT      not null,
          createdAt   timestamp not null default current_timestamp(),
          updatedAt   timestamp not null default current_timestamp()
      )
  `,
  ingredient: `
      CREATE TABLE IF NOT EXISTS ingredient
      (
          recipeId char(36) REFERENCES recipes (recipeId),
          name     varchar(100) not null,
          quantity char(50)     not null
      )
  `,

  bookmark: `
      CREATE TABLE IF NOT EXISTS bookmark
      (
          userId       char(36)  not null REFERENCES users (userId),
          recipeId     char(36)  not null REFERENCES recipes (recipeId),
          PRIMARY KEY (userId, recipeId),
          bookmarkedAt timestamp not null default current_timestamp()
      )
  `,

  instructions: `
      CREATE TABLE IF NOT EXISTS instructions
      (
          recipeId    char(36) REFERENCES recipes (recipeId),
          stepOrder   INT  not null,
          PRIMARY KEY (recipeId, stepOrder),
          title       TEXT not null,
          imgUrl      TEXT not null,
          description TEXT not null
      )
  `,
};
