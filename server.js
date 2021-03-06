const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt-nodejs');

const charimage = require('./controllers/imageUpload');
const addname = require('./controllers/addname');
const genchar = require('./controllers/genchar');
const addroleplay = require('./controllers/addRoleplay');
const addintrigue = require('./controllers/addIntrigue');
const cloudnote = require('./controllers/cloudnote');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const app =  express();

cloudinary.config({ 
   cloud_name: 'zibbly', 
   api_key: '766114696781663', 
   api_secret: 'cMGDYZfr1hZS-hFXsOCKpO8YHUA' 
});
const db = knex({
   client:'pg',
   connection: {
      connectionString: process.env.DATABASE_URL,
      ssl : true, 
   }
})

app.use(bodyParser.json({limit: '90mb', extended: true}));
app.use(cors())
app.get('/', (req, res)=>{ res.send('it is working') })
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

//REPLY FROM CLOUDINARY MODERATION
app.post('/cloudnotification', (req, res)=>{ cloudnote.handleCloudNote(req,res,db)});


app.post('/signin', signin.handleSignIn(db, bcrypt) );
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } );
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db)});


app.listen(process.env.PORT || 3000, ()=> {
   console.log("App running on port ${process.env.PORT}")
});
