const handleGenChar = (req, res, db,) => {
   let gender = req.body.gender;
   let race = req.body.race;
   let role = req.body.role;

   //GEN THE CHARACTER CHAIN
   //GEN THE NAME
   db('names'+race+gender)
      .select('name').orderByRaw('RANDOM() LIMIT 1')
   //SAVE NAME TEMP
   .then(returnedName=>{
      let returnName = returnedName
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
               let returnAge = returnedAgeMax
                  db('names'+race+'last')
                     .select('lastname')
                     .orderByRaw('RANDOM() LIMIT 1')
                  
                  .then(returnedLastName => {
                     //GENERATE FINAL RETURN
                     let finalReturn = []
                     finalReturn[0] = returnName
                     finalReturn[1] = returnImage
                     finalReturn[2] = returnAge
                     finalReturn[3] = returnedLastName
                     res.json(finalReturn)
                  })
            })
      })
   })
}


module.exports = {
   handleGenChar: handleGenChar
};