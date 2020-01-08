const handleGenChar = (req, res, db,) => {
   let randomGenderArr = [true,true];
   let randomRaceArr = ['human','human'];
   let randomRoleArr = ['merchant','wizard'];
   if(req.body.gender === 'random'){
      var gender = true
      // randomGenderArr[Math.floor(Math.random()*randomGenderArr.length)];
   } else {
      var gender = true
      // req.body.gender;
   }
   if(req.body.race === 'random'){
      var race = 'human'
      // randomRaceArr[Math.floor(Math.random()*randomRaceArr.length)];
   }  else {
      var race = 'human'
      // req.body.race;
   }
   if(req.body.role === 'random'){
      var role = 'merchant'
      // randomRoleArr[Math.floor(Math.random()*randomRoleArr.length)];
   } else {
      var role = 'merchant'
      // req.body.role;
   }

   //GEN THE CHARACTER CHAIN
   

   db({ 
      a:'names'+race, 
      b:'img'+race, 
      c:'raceagemax',
      d:'names'+race+'last',
      e:'descintrigue',
      f:'descroleplay'
   })
      //SELECT NAME AND IMAGE
      .select('a.name', 'b.url')
      .where('b.gender', gender)
      .where('b.moderation', true)
      
      //GET CHAR RACE MAX AGE
      .select('c.maxage')
      .where('c.race', race)
      //GET CHAR LAST NAME
      .select('d.lastname')
      //GET INTRIGUE
      .select('e.intrigue')
      .orderByRaw('RANDOM() LIMIT 1')
      //GET THREE ROLEPLAY Q'S
      .then(data=>{
         let charDataOne = data
         db('descroleplay')
         .select('roleplay')
         .orderByRaw('RANDOM() LIMIT 3')

         .then(data=>{
            let finalData = []
            finalData[0] = charDataOne
            finalData[1] = data
            finalData[2] = role;
            finalData[3] = race;
            finalData[4] = gender;  
            res.status(200).json(finalData)
         })
      })
}

module.exports = {
   handleGenChar: handleGenChar
};