const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}); 
const port = 8000;


//define mongoose schema
var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    danceForm: String,
    country: String,
  });

const contact = mongoose.model('contact', contactschema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }));


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 // ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    const newContact = new contact(req.body);
    newContact.save().then(() => {
      res.send('This item has been saved to the database');
    }).catch(() => {
      res.status(400).send('Item was not saved to the database');
    });
  });
  
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});