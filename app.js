var express = require('express');
var mongojs = require('mongojs');

var app = express();
var db = mongojs('Catalog', ['products']);


app.get('/', function(req, res){
    res.send('IT works!!');
});

app.get('/products', function(req, res) {
    console.log('Fetching products...');
    db.products.find(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            console.log('Sending products...');
            res.json(docs);
        }
    });
});

app.get('/products/:id', function(req, res) {
    console.log('Fetching product...');
    db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            console.log('Sending product...');
            res.json(doc);
        }
    });
});

app.listen(3000, function() {
    console.log('Server running on port 3000...');
});