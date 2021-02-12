const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const serverless = require("serverless-http");
const dotenv =require('dotenv').config()
// console.log(dotenv.parsed)
console.log(process.env.NODE_ENV)

const path= require('path');
const app= express();


const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI

//conect to db
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT))
  .catch(err => console.log(err));

  //enable EJS engin
app.set('view engine', 'ejs');
// face accesibil/public folderul in cauza, poate contine: jpg,html,css...
app.use(express.static('public'))
//ataseaza parse valoarea/nume din, forma-submit
app.use(express.urlencoded({ extended: true}));

// const routes= require('./routes/routes.js')
// app.use(routes)
// app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res)=>{
//   res.sendFile('./views/index.html', {root: __dirname})})

app.get('/', (req, res)=>{
 res.redirect('/blogs')
})

app.get('/about', (req, res)=>{
  res.render("about", {title: "About"})
});


//blog routes
app.use(blogRoutes)

app.use((req, res)=>{
  res.render('404', {title: "404"})
})




