const handleAddName  = (req, res, db,) => {
   let gender = req.body.gender;
   let race = req.body.race;
   let name = req.body.name;
   let lastname = req.body.lastname
   db('names'+race+gender)
      .insert({'name': name})
   .then(data=>{
      db('names'+race+'last')
         .insert({'lastname': lastname})
            .then(data=>{
               res.status(200).json('Success')
            })
            .catch(error => res.status(400).json('duplicate last name'))
      
   })
   .catch(error => res.status(400).json('duplicate'))
}

module.exports = {
   handleAddName: handleAddName
};