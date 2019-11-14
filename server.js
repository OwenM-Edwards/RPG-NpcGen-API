const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
   cloud_name: 'zibbly', 
   api_key: '766114696781663', 
   api_secret: 'cMGDYZfr1hZS-hFXsOCKpO8YHUA' 
});


const database = knex({
   client:'pg',
   connection: {
      host: '127.0.0.1',
      user:'postgres',
      password:'2454',
      database:'rpgnpcgen'
   }
})
 
const app =  express();
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res)=> {
   console.log('hey');
}) 



//POSTING IMAGES
app.post('/charimage', function(req, res){
   cloudinary.uploader.upload(`${__dirname}/images/female/FDWBA00_lg.png`,
      function(error, result) {
         saveToDatabase(req, result.url)
      }
   );
   // const file = `${__dirname}/images/` + gender + `/FDWBA00_lg.png`;
   // res.download(file); // Set disposition and send it.
});
saveToDatabase = (req,url) => {
   let gender = req.body.gender;
   let race = req.body.race;
   if(gender === 'female'){
         database.insert({'female': url}).into(race)
         .then(data=>{
      })
   } else{
      database.insert({'url': url}).into(race+gender)
         .then(data=>{
      })
   }
}
//POSTING IMAGES




app.post('/genchar', (req, res)=>{
   let gender = req.body.gender;
   let race = req.body.race;
   let role = req.body.role;
   let file = `${__dirname}/images/female/FDWBA00_lg.png`;
   database(race).select(gender).orderByRaw('RANDOM() LIMIT 1')
   .then(data=>{
      res.json(data)
   })
   .catch(err=>res.status(400).json('Error'))
})


app.listen(3000, ()=> {
   console.log("App running port 3000")
})
