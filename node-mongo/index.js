const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboperation = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Successfully connected to the server.');

    const db = client.db(dbname);
    // const collection = db.collection('dishes');

    // collection.insertOne({
    //     "name": "Uthapizza",
    //     "description": "test"
    // }, (err, result) => {
    //     assert.equal(err, null);
    //     console.log('After insert: \n');
    //     console.log(result.ops);

    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err, null);
    //         console.log('Found: \n');
    //         console.log(docs);

    //         db.dropCollection('dishes', (err, result) => {
    //             assert.equal(err, null);
    //             client.close();
    //         });
    //     });
    // });

    dboperation.insertDocument(db, [{
            "name": "Vadonut",
            "description": "test"
        }], 'dishes', (result) => {
        
        console.log('Insert Document:\n', result.ops);

        dboperation.findDocument(db, 'dishes', (docs) => {
            console.log('Found documents:\n', docs);

            dboperation.updateDocument(db, {
                    name: "Vadonut"
                }, {
                    description: "Updated test"
                }, 'dishes', (result) => {
                
                console.log('Updated Document:\n', result.result);

                dboperation.findDocument(db, 'dishes', (docs) => {
                    console.log('Found documents:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Collection dropped', result);
                        client.close();
                    });
                });
            });
        });
    });
});