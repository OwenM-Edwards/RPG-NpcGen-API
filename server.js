const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const cloudinary = require('cloudinary').v2;

const charimage = require('./controllers/imageUpload');
const addname = require('./controllers/addname');
const genchar = require('./controllers/genchar');
const addroleplay = require('./controllers/addRoleplay');
const addintrigue = require('./controllers/addIntrigue');

cloudinary.config({ 
   cloud_name: 'zibbly', 
   api_key: '766114696781663', 
   api_secret: 'cMGDYZfr1hZS-hFXsOCKpO8YHUA' 
});
const db = knex({
   client:'pg',
   connection: {
      host: '127.0.0.1',
      user:'postgres',
      password:'2454',
      database:'rpgnpcgen'
   }
})
const app =  express();
app.use(bodyParser.json({limit: '90mb', extended: true}));
app.use(cors())
 
//ADDIING NEW ROLEPLAY PROMPT
app.post('/addroleplay', (req, res)=>{ addroleplay.handleAddRoleplay(req, res, db)});
//ADDIING NEW INTRIGUE
app.post('/addintrigue', (req, res)=>{ addintrigue.handleAddIntrigue(req, res, db)});
//POSTING NEW IMAGE
app.post('/charimage', (req, res)=>{ charimage.handleCharImage(req, res, db, cloudinary)});
//ADDING NEW NAME
app.post('/addname', (req, res)=>{ addname.handleAddName(req,res,db)});
//GENERATE THE CHARACTER
app.post('/genchar', (req, res)=>{ genchar.handleGenChar(req,res,db)});


app.listen(3000, ()=> {
   console.log("App running port 3000")
})
