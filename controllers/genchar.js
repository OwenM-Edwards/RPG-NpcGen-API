const handleGenChar = (req, res, db,) => {
   let randomGenderArr = ['male','female'];
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
   //GEN THE NAME
   db('names'+race+gender)
      .select('name').orderByRaw('RANDOM() LIMIT 1')
   //SAVE NAME TEMP
   .then(returnedName=>{
      let returnName = returnedName
      let returnRole = role

      //GEN THE IMAGE 
      db('img'+race+gender)
         .select('url')
         .orderByRaw('RANDOM() LIMIT 1')
      //SAVETHEIMAGETEMP
      .then(returnedImage=>{
         let returnImage = returnedImage
            //GEN CHAR AGE
            db('raceagemax')
               .select('maxage')
               .where('race', '=', race)
            .then(returnedAgeMax => {
               //GET LAST NAME
               let returnAge = returnedAgeMax
                  db('names'+race+'last')
                     .select('lastname')
                     .orderByRaw('RANDOM() LIMIT 1')
                  
                  .then(returnedLastName => {
                     // GET INTRIGUE
                     let returnLastName = returnedLastName
                        db('descintrigue')
                           .select('intrigue')
                           .orderByRaw('RANDOM() LIMIT 1')

                           .then(returnedIntrigue => {
                              let returnIntrigue = returnedIntrigue
                                 db('descroleplay')
                                    .select('roleplay')
                                    .orderByRaw('RANDOM() LIMIT 3')
                                 .then(returnedRoleplay => {
        
                                    let finalReturn = []
                                    finalReturn[0] = returnName
                                    finalReturn[1] = returnImage
                                    finalReturn[2] = returnAge
                                    finalReturn[3] = returnedLastName
                                    finalReturn[4] = returnedIntrigue
                                    finalReturn[5] = returnedRoleplay
                                    finalReturn[6] = role
                                    finalReturn[7] = race
                                    finalReturn[8] = gender   

                                    res.json(finalReturn)
                                 })
                              })
                     //GENERATE FINAL RETURN
                     
                  })
            })
      })
   })
}
module.exports = {
   handleGenChar: handleGenChar
};