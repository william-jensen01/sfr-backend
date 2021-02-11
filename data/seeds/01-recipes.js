
exports.seed = function(knex) {
  return knex('recipes').truncate()
    .then(function () {
      return knex('recipes').insert([
        {recipe_name: "PBJ", category: "lunch", ingredients: "2 slices of bread, peanut butter, grape jam", instructions: "Spread peanut butter on one slice of bread and jam on the other slice. Combine slices together. Enjoy!"},
        {recipe_name: "Grilled Cheese", category: "sandwich", source: "Josh", ingredients: "2 slices of bread, 1 slice of cheese, butter", instructions: "Spread butter on outer pieces of bread. Lay 1 slice butter-side down on pan. Place cheese on top. Lay last slice of bread butter-side up. Cook until bread is golden brown."}
      ]);
    })
};
