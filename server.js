const express = require('express');
const bodyParser = require('body-parser');


const app =  express();
app.use(bodyParser.json());

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

pickRandomProperty = (obj) => {
   var result;
   var count = 0;
   for (var prop in obj)
       if (Math.random() < 1/++count)
          result = prop;
   return result;
}

app.get('/', (req, res)=> {
   res.send('this is working');
})

app.get('/genchar', (req, res)=>{
   res.send(constructChar(req.body.race, res));

})


app.listen(3000, ()=> {
   console.log("App running port 3000")
})




// --> this is working
// getChar --> GET = Race/role/system