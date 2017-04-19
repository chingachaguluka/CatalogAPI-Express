var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('Catalog', ['products']);

//Inserting body parser middleware 
app.use(bodyParser.json());

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

app.post('/products', function(req, res) {
    console.log('Inserting products...');
    console.log(req.body);
    db.products.insert(req.body, function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            console.log('sending products...');
            res.json(doc);
        }
    });
});

app.put('/product/:id', function(req, res) {
    console.log('Updating products...');
    db.products.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},  
                    update: {$set: {
                        name: req.body.name,
                        category: req.body.category,
                        price: req.body.price
                    }},
                    new: true          
                    }, function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            console.log('Updating products...');
            res.json(doc);
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

app.delete('/products/:id', function(req, res) {
    console.log('Fetching product...');
    db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            console.log('Removing product...');
            res.json(doc);
        }
    });
});

app.listen(5000, function() {
    console.log('Server running on port 3000...');
});