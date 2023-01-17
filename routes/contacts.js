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

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

// exports
module.exports = router;