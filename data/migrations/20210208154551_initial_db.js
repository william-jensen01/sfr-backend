exports.up = function(knex) {
    return knex.schema
        .createTable("recipes", tbl => {
            tbl.increments();
            tbl.string("recipe_name", 128).notNullable();
            tbl.string("category", 128);
            tbl.string("source", 64);
            tbl.string("ingredients", 256).notNullable();
            tbl.string("instructions", 512).notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("recipes");
};
