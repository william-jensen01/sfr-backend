const db = require('../../data/db-config');

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}

function getAll() {
    return db("recipes");
}

async function getById(id) {
    const [recipe] = await db("recipes").where({ id });
    return recipe;
}

async function add(recipe) {
    const [newRecipeId] = await db("recipes").insert(recipe);
    const newRecipe = await getById(newRecipeId);
    return newRecipe;
}

async function update(id, changes) {
    const count = await db("recipes").where({ id }).update(changes);
    const updatedRecipe = await getById(id)
    return updatedRecipe;
}

async function remove(id) {
    const count = await db("recipes").where({ id }).del();
    return count;
}