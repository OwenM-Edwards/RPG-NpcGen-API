const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')


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

// TEMP DATABASES
const raceDatabase ={
   human:[
      'sally',
      'pete',
      'wally',
      'nigel'
   ],
   orc:[
      'Gurth',
      'Galron',
      'Poolie',
      'Hargarod'
   ]
}

// TEMP DATABASES



constructChar=(race, res)=>{
   let keys = Object.keys(raceDatabase);
   keys.forEach(function(key){
      if(race === key){
         let target = raceDatabase[key]
         let item = raceDatabase[key][Math.floor(Math.random()*raceDatabase[key].length)];
         return res.status(200).json(item);
      }
   })
  
   // let charName = raceDatabase.race[Math.floor(Math.random() * raceDatabase.human.length)];
   // return charName;
}

app.get('/', (req, res)=> {
   res.send('this is working');
}) 

app.post('/genchar', (req, res)=>{
   // res.send(constructChar(req.body.race, res));
   // database.select('*').from('nameshuman').then(data => {
   //    res.json(data);
   // });
   let gender = req.body.gender;
   let race = req.body.race;
   database(race).select(gender).orderByRaw('RANDOM() LIMIT 1')
   
   
   .then(data=>{
      res.json(data);
   })

})


app.listen(3000, ()=> {
   console.log("App running port 3000")
})
