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
         saveImageToDatabase(req, result.url)
         
      } 
   )
   .then(
      res.status(200).json('Image added to database')
   )
   .catch(
      res.status(400).json('Error adding image')
   )
   // const file = `${__dirname}/images/` + gender + `/FDWBA00_lg.png`;
   // res.download(file); // Set disposition and send it.
});
saveImageToDatabase = (req,url) => {
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



//ADDING NEW NAME
app.post('/addname', (req, res)=>{
   let gender = req.body.gender;
   let race = req.body.race;
   let name = req.body.name;
   database('names' + race + gender)
      .insert({'name': name})
   .then(data=>res.status(200).json('Success'))
   .catch(error => res.status(400).json('duplicate'))
})




//GEN CHAR
app.post('/genchar', (req, res)=>{
   let gender = req.body.gender;
   let race = req.body.race;
   let role = req.body.role;

   //SELECT THE NAME
   database('names' + race + gender)
      .select('name').orderByRaw('RANDOM() LIMIT 1')

   .then(data=>{
      //SAVE NAME TEMP
      let returnName = data

      //SELECT THE IMAGE
      database('img'+race+gender)
         .select('url').orderByRaw('RANDOM() LIMIT 1')

      .then(returnImage=>{
         let completeReturn = []
         completeReturn[0] = returnImage
         completeReturn[1] = returnName
         res.json(completeReturn)
      })
      .catch(err=>
         res.status(400).json('error')
      ) 
   })
})


app.listen(3000, ()=> {
   console.log("App running port 3000")
})
