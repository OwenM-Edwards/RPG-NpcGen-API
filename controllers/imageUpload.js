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
   let gender = req.body.gender;
   let race = req.body.race;
   let role = req.body.role;
   db('img'+race+gender).insert({'url':url, 'role':role, 'key':id})
   .then(data=>{
   })
}

module.exports = {
   handleCharImage: handleCharImage
};