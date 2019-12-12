//POSTING IMAGES
const handleCharImage = (req, res, db, cloudinary) => {
   cloudinary.uploader.upload(req.body.image[0].src.base64, 
      // { moderation: 'manual',
      // notification_url: "https://mysite.example.com/mod_endpoint"  },
      function(error, result) {
         saveImageToDatabase(req, result.url, result.public_id, db)
      })
      .then(
      )
      .catch( 
         res.status(400).json('Error adding image')
      )
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