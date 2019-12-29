//POSTING IMAGES
const handleCharImage = (req, res, db, cloudinary) => {
   cloudinary.uploader.upload(req.body.image[0].src.base64, 
      { moderation: 'manual' },
      function(error, result) {
         if (error) {
            // handle error
         } else {
            console.log(result);
         }
      });
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