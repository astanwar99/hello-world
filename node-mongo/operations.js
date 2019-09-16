const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertMany(document, (err, result) => {
        assert.equal(err, null);
        console.log("Successfully inserted " + result.result.n 
            + " documents into " + collection + " collection");
        callback(result);
    });
};

exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Successfully removed: " + document);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set: update}, (err, result) => {
        assert.equal(err, null);
        console.log('Document updated with: ', update);
        callback(result);
    });
};