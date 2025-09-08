const express = require('express');

const nodeController = require('../controllers/nodeController');

const router = express.Router();

// GET /feed/posts
router.get('/', nodeController.getData);
// localhost:8080/professional/
module.exports = router;