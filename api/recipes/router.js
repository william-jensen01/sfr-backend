const express = require('express');
const Recipes = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const recipes = await Recipes.getAll();
        res.status(200).json(recipes);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', checkId, async (req, res, next) => {
    try {
        res.status(200).json(req.recipe);
    } catch (err) {
        next(err);
    }
});

router.post('/', checkPayload, async (req, res, next) => {
    try {
        const newRecipe = await Recipes.add(req.body);
        res.status(201).json(newRecipe);
    } catch (err) {
        err.message = "failed to add recipe";
        next(err);
    }
});

router.put('/:id', checkId, checkPayload, async (req, res, next) => {
    try {
        const updatedRecipe = Recipes.update(req.params.id, req.body);
        res.status(200).json(updatedRecipe);
    } catch (err) {
        err.message = "failed to change recipe";
        next(err);
    }
});

router.delete('/:id', checkId, async (req, res, next) => {
    try {
        const data = await Recipes.remove(req.params.id);
        res.status(200).json({ removed: data});
    } catch (err) {
        err.message = "failed to delete recipe";
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    res.status(err.statusCode).json({ message: err.message, stack: err.stack });
});

async function checkId(req, res, next) {
    try {
        const recipe = await Recipes.getById(req.params.id);
        if (recipe) {
            req.recipe = recipe;
            next();
        } else {
            err.message = "invalid id";
            err.statusCode = 404;
            next(err);
        }
    } catch (err) {
        err.message = "error retrieving recipe";
        err.statusCode = 500;
        next(err);
    }
};

async function checkPayload(req, res, next) {
    const body = req.body;
    if (!body.recipe_name || !body.ingredients || !body.directions) {
        err.message = 'body must include "recipe_name", "ingredients", "directions"';
        err.statusCode = 400;
        next(err);
    } else {
        next();
    }
}

module.exports = router;