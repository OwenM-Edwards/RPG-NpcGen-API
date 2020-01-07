const handleGenChar = (req, res, db,) => {
   let randomGenderArr = [true,true];
   let randomRaceArr = ['human','human'];
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
         callback(data)
      })
      .catch(error =>{
         console.log(error)
      })
   }
   generateCharFirstName(db,race,gender, (data)=>{
      returnedChar[0] = 'hey owen';
   });


   generateCharImage = (db,race,gender,callback) =>{
      db('img'+race)
         .select('url')
         .where({gender:gender})
         .where({moderation:true})
         .orderByRaw('RANDOM() LIMIT 1')
      .then(data=>{
         callback(data)
      })
      .catch(error=>{
         console.log(error)
      })
   }
   generateCharImage(db,race,gender, (data)=>{
      returnedChar[1] = data[0].url;
   });


   generateCharAge = (db,race,callback) =>{
      db('raceagemax')
         .select('maxage')
         .where('race', '=', race)
      .then(data=>{
         callback(data);
      })
      .catch(error=>{
         console.log(error)
      })
   }
   generateCharAge(db,race, (data)=>{
      returnedChar[2] = data;
   });


   generateCharLastName = (db,race,callback) =>{
      db('names'+race+'last')
         .select('lastname')
         .orderByRaw('RANDOM() LIMIT 1')
      .then(data =>{
         callback(data);
      })
      .catch(error=>{
         console.log(error)
      })
                  
   }
   generateCharLastName(db,race, (data)=>{
      returnedChar[3] = data[0].lastname;
   });


   generateCharIntrigue = (db,callback) =>{
      db('descintrigue')
         .select('intrigue')
         .orderByRaw('RANDOM() LIMIT 1')
      .then(data =>{
         callback(data);
      })
      .catch(error=>{
         console.log(error)
      })
   }
   generateCharIntrigue(db, (data)=>{
      returnedChar[4] = data[0].intrigue;
   });


   generateCharRoleplay = (db,callback) =>{
      db('descroleplay')
         .select('roleplay')
         .orderByRaw('RANDOM() LIMIT 3')
      .then(data =>{
         callback(data);
      })
      .catch(error=>{
         console.log(error)
      })
   }
   generateCharRoleplay(db, (data)=>{
      returnedChar[5] = data;
   });

   console.log(returnedChar);
   returnedChar[6] = role;
   returnedChar[7] = race;
   returnedChar[8] = gender;  
   res.status(200).json(returnedChar)
}

module.exports = {
   handleGenChar: handleGenChar
};