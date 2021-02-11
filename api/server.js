const express = require('express');
const cors = require('cors');
const RecipesRouter = require('./recipes/router');

const server = express();

server.use(cors())
server.use(express.json());
server.use('/api/recipes', RecipesRouter)

module.exports = server;