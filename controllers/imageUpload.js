//POSTING IMAGES
const handleCharImage = (req, res, db, cloudinary) => {

   saveImageToDatabase(req, result.url, result.public_id, db)
};
saveImageToDatabase = (req,url, id,db) => {
   if(req.body.gender == 'male'){
      var charGender = true
   } else if(req.body.gender == 'female'){
      var charGender = false
   }
   let race = req.body.race;
   let role = req.body.role;
   db('test_table')
      .insert({'test': role})
      .then(data=> {
         db('img'+race).insert({'url':url, 'role':role, 'key':id, 'gender':gender})
         .then(data=>{
         })
      })
      .catch(error=>{
         res.status(800).json('duplicate last name')
      })
   
}

module.exports = {
   handleCharImage: handleCharImage
};