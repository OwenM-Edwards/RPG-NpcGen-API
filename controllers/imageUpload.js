//POSTING IMAGES
const handleCharImage = (req, res, db, cloudinary) => {
   cloudinary.uploader.upload(req.body.image[0].src.base64, 
      { moderation: 'manual',tags: req.body.race },
      function(error, result) {
         if (error) {
            // handle error
         } else {
            saveImageToDatabase(req, result, db)
            // console.log(result);
         }
      });
};
saveImageToDatabase = (req,result,db) => {
   if(req.body.gender == 'male'){
      var charGender = true
   } else if(req.body.gender == 'female'){
      var charGender = false
   }
   let race = req.body.race;
   let role = req.body.role;
   let url = result.url
   let id = result.public_id
   db('img'+race).insert({'url':url, 'role':role, 'key':id, 'gender':charGender, 'moderation':false})
   .then(data=>{
   })
   .catch(error=>{
      console.log(error)
   })
}

module.exports = {
   handleCharImage: handleCharImage
};