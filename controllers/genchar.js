const handleGenChar = (req, res, db,) => {
   let randomGenderArr = [true,false];
   let randomRaceArr = ['human','orc'];
   let randomRoleArr = ['merchant','wizard'];
   if(req.body.gender === 'random'){
      var gender = randomGenderArr[Math.floor(Math.random()*randomGenderArr.length)];
   } else {
      var gender = req.body.gender;
   }
   if(req.body.race === 'random'){
      var race = randomRaceArr[Math.floor(Math.random()*randomRaceArr.length)];
   }  else {
      var race = req.body.race;
   }
   if(req.body.role === 'random'){
      var role = randomRoleArr[Math.floor(Math.random()*randomRoleArr.length)];
   } else {
      var role = req.body.role;
   }

   //GEN THE CHARACTER CHAIN
   

   let returnedChar = []
   generateCharFirstName = (db,race,gender,callback) =>{
      db('names'+race)
         .select('name')
         .where({gender:gender})
         .orderByRaw('RANDOM() LIMIT 1')
      .then(data =>{
         console.log('hey')
         callback(data)
      })
      .catch(error =>{
         console.log(error)
      })
   }
   generateCharFirstName(db,race,gender, (data)=>{
      console.log(data)
   });
   generateCharImage = (db,race,gender) =>{
      db('img'+race)
         .select('url')
         .where({gender:gender})
         .orderByRaw('RANDOM() LIMIT 1')
      .then(data=>{
         callback(data)
      })
      .catch(error=>{
         console.log(error)
      })
   }
   generateCharAge = (db,race) =>{
      db('raceagemax')
         .select('maxage')
         .where('race', '=', race)
      .then(data=>{
         return data
      })
      .catch(error=>{
         console.log(error)
      })
   }
   generateCharLastName = (db,race) =>{
      db('names'+race+'last')
         .select('lastname')
         .orderByRaw('RANDOM() LIMIT 1')
      .then(data =>{
         return data
      })
      .catch(error=>{
         console.log(error)
      })
                  
   }
   generateCharIntrigue = (db) =>{
      db('descintrigue')
         .select('intrigue')
         .orderByRaw('RANDOM() LIMIT 1')
      .then(data =>{
         return data
      })
      .catch(error=>{
         console.log(error)
      })
   }
   generateCharRoleplay = (db) =>{
      db('descroleplay')
         .select('roleplay')
         .orderByRaw('RANDOM() LIMIT 3')
      .then(data =>{
         return data
      })
      .catch(error=>{
         console.log(error)
      })
   }

   returnedChar[1] = 'hello';
   returnedChar[2] = generateCharAge(db,race);
   returnedChar[3] = generateCharLastName(db,race);
   returnedChar[4] = generateCharIntrigue(db);
   returnedChar[5] = generateCharRoleplay(db);
   returnedChar[6] = role;
   returnedChar[7] = race;
   returnedChar[8] = gender;  
   // console.log(returnedChar)
   res.status(200).json(returnedChar)
}

module.exports = {
   handleGenChar: handleGenChar
};