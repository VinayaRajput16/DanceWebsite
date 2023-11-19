const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}); 
const port = 8000;


//define mongoose schema
var Accountschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    danceForm: String,
    country: String,
  });
var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    query: String,
    
  });

const contact = mongoose.model('contact', contactschema);
const Account = mongoose.model('Account', Accountschema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }));


// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 // ENDPOINTS
 function renderHomePage(res) {
  const con = "This is the best content on the internet so far so use it wisely";
  const params = {};
  res.status(200).render('home.pug', params);
}

app.get('/', (req, res)=>{
  renderHomePage(res);
});

app.get('/home', (req, res)=>{
  renderHomePage(res);
});

app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.get('/forms', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {};
    res.status(200).render('forms.pug', params);
})
app.get('/classes', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {};
    res.status(200).render('classes.pug', params);
})
app.get('/about', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {};
    res.status(200).render('about.pug', params);
})
app.get('/Account', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {};
    res.status(200).render('Account.pug', params);
})
app.post('/contact', (req, res) => {
    const newContact = new contact(req.body);
    newContact.save().then(() => {
      res.send('This item has been saved to the database');
    }).catch(() => {
      res.status(400).send('Item was not saved to the database');
    });
  });
  app.post('/Account', (req, res) => {
    const newAccount = new Account(req.body);
    newAccount.save().then(() => {
      res.send('Account created successfully!');
    }).catch((err) => {
      res.status(400).send(`Error: ${err}`);
    });
  });
  
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
