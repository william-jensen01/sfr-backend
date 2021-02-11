const express = require('express');
const Recipes = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipes.getAll();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: "error while getting recipes" })
    }
});

router.get('/:id', checkId, async (req, res) => {
    try {
        res.status(200).json(req.recipe);
    } catch (err) {
        res.status(500).json({ message: "error while getting specified recipe" })
    }
});

router.post('/', checkPayload, async (req, res) => {
    try {
        const newRecipe = await Recipes.add(req.body);
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ message: "error while adding new recipe" })
    }
});

router.put('/:id', checkId, checkPayload, async (req, res) => {
    try {
        const updatedRecipe = Recipes.update(req.params.id, req.body);
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: "error while updating recipe" })
    }
});

router.delete('/:id', checkId, async (req, res) => {
    try {
        const data = await Recipes.remove(req.params.id);
        res.status(200).json({ removed: data});
    } catch (err) {
        res.status(500).json({ message: "error while deleting recipe" })
    }
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
    if (!body.recipe_name || !body.category || !body.source || !body.ingredients || !body.instructions) {
        res.status(400).json({ message: "please check info" })
    } else {
        next();
    }
}

module.exports = router;