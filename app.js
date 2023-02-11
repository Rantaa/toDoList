const express = require('express');
const bodyParser = require('body-parser');
const getDate = require('./date');
const date = require(__dirname + '/date.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

let items = [];
let workItems = [];


app.get('/', function(req, res) {

    let day = date.getDate();
    
    res.render('list', {listTitle: day, items: items});
})

app.post('/', function(req, res) {

    let newItem = req.body.newItem;
    
    if (req.body.list === 'Work') {
        workItems.push(newItem)
        res.redirect('/work');
    } else {
        items.push(newItem);
        res.redirect('/');

    }
    
    
})

app.get('/work', function(req, res) {
    res.render('list', {listTitle: 'Work List', items: workItems} )
})

app.get('/about', function(req, res) {
    res.render('about');
})


app.listen(3000, function() {
    console.log('Server running on port 3000.')
})