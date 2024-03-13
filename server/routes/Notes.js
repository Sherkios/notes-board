const express = require('express');
const router = express.Router();

const controller = require('../controller/notesController')

router.get('/user', controller.get);

router.post('/', controller.post);

router.get('/user/:id', controller.getByUserId);

router.put('/:id', controller.put);

router.delete('/:id', controller.delete);

module.exports = router;