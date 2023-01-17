const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

// get all contacts
exports.getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('school').collection('contacts').find(); // connect to the db and collection. return all users
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

// get a single contact
exports.getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id); // get the id entered in the url
    const result = await mongodb
        .getDb()
        .db('school')
        .collection('contacts')
        .find({
            _id: userId
        }); // connect to the db and collection. select the user by id
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};
// create contact
exports.createContact = async (req, res, next) => {
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }; // object getting the req body info
    const result = await mongodb
        .getDb()
        .db('school')
        .collection('contacts')
        .insertOne(newContact); // connect to the db and collection. select the user by id and pass the newContact info 
    // respond with status
    if (result.acknowledged) {
        res.status(201).json(result); // successful
    } else {
        res.status(500).json(result.error || 'There was an error while creating the contact.'); // failed
    }
};

exports.updateContact = async (req, res, next) => {
    const userId = new ObjectId(req.params.id); // get the id entered in the url
    const updateContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }; // object getting the req body info
    const result = await mongodb
        .getDb()
        .db('school')
        .collection('contacts')
        .replaceOne({
            _id: userId
        }, updateContact); // connect to the db and collection. select the user by id and pass the updatedContact info 
    if (result.modifiedCount > 0) {
        res.status(201).json(result); // successful
    } else {
        res.status(500).json(result.error || 'There was an error while updating the contact.'); // failed
    }
};

exports.deleteContact = async (req, res, next) => {
    const userId = new ObjectId(req.params.id); // get the id entered in the url
    const result = await mongodb
        .getDb()
        .db('school')
        .collection('contacts')
        .remove({
            _id: userId
        }, true); // connect to the db and collection. select the user by id
    if (result.deletedCount > 0) {
        res.status(201).json(result); // successful
    } else {
        res.status(500).json(result.error || 'There was an error while deleting the contact.'); // failed
    }
};