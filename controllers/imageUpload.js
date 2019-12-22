//POSTING IMAGES
const handleCharImage = (req, res, db, cloudinary) => {
   db('test_table')
      .insert({test: 'hey'})
      .then(data=> {
         res.status(200).json('success')
      })
      .catch(error=>{
         res.status(800).json('duplicate last name')
      })
};
saveImageToDatabase = (req,url, id,db) => {
   if(req.body.gender == 'male'){
      var charGender = true
   } else if(req.body.gender == 'female'){
      var charGender = false
   }
   let race = req.body.race;
   let role = req.body.role;
   db('img'+race).insert({'url':url, 'role':role, 'key':id, 'gender':gender})
   .then(data=>{
   })
}

module.exports = {
   handleCharImage: handleCharImage
};