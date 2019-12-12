const handleAddName  = (req, res, db,) => {
   if(req.body.gender == 'male'){
      var charGender = true
   } else if(req.body.gender == 'female'){
      var charGender = false
   }
   let race = req.body.race;
   let name = req.body.name;
   let lastname = req.body.lastname
   if(req.body.name){
      db('mod_names'+race)
         .insert({'name': name, "gender":charGender})
         .then(data=>{
            db('mod_names'+race+'last')
               .insert({'lastname': lastname})
                  .then(data=>{
                     res.status(200).json('Success')
                  })
                  .catch(error => res.status(800).json('duplicate last name'))
         })
         .catch(error => res.status(400).json('duplicate'))
   } else {
      db('mod_names'+race+'last')
         .insert({'lastname': lastname})
         .then(data=>{
            res.status(200).json('Success')
         })
         .catch(error => res.status(900).json('duplicate last name'))
   }
}

module.exports = {
   handleAddName: handleAddName
};