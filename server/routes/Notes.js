const express = require('express');
const router = express.Router();

const controller = require('../controller/notesController')

router.get('/', controller.get);

router.post('/', controller.post);

router.get('/:id', controller.getById);

router.put('/:id', controller.put);

router.delete('/:id', controller.delete);

module.exports = router;