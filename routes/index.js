// core mods
// addon mods
const express = require('express');
// custom mods

// use router
const router = express.Router();

// routes
router.use('/contacts', require('./contacts'));

// exports
module.exports = router;