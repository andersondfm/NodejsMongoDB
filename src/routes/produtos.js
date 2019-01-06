'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getByID);
router.get('/tags/:tag', controller.getByTag);
router.post('/', controller.post);
router.delete('/:id', controller.delete); 
router.put('/', controller.put);

module.exports = router;