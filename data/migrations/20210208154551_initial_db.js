exports.up = function(knex) {
    return knex.schema
        .createTable("recipes", tbl => {
            tbl.increments();
            tbl.string("recipe_name", 128).notNullable();
            tbl.specificType("category", "text ARRAY").notNullable();
            tbl.string("source", 64);
            tbl.specificType("ingredients", "text ARRAY").notNullable();
            tbl.string("directions", 512).notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("recipes");
};
