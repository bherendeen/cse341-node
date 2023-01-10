// core mods
// addon mods
const express = require('express');
// custom mods

// use router
const router = express.Router();

const contactsController = require('../controller/contacts');

// routes
router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

// exports
module.exports = router;