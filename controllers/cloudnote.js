const handleCloudNote = (req, res, db,) => {
   if(req.body.moderation_status === 'approved') {
      let imgKey = req.body.public_id;
      console.log(req.body)

      if(searchHumanTable(imgKey, db)){
         console.log('Success Human')
         res.status(200)
      }
      else if(searchOrcTable(imgKey, db)){
         console.log('Success Orc')
         res.status(200)
      }
      else {
         console.log('Failure Both')
         res.status(500)
      }

   } else {
      console.log('Moderation not approved');
   }
}

searchHumanTable = (imgKey, db) =>{
   db('imghuman')
      .insert({'moderation':true})
      .where({'key':imgKey})
   .then(data=>{
      console.log(data)
   })
   .catch(error=>{
      console.log(error)
   })
}
searchOrcTable = (imgKey, db) =>{
   db('imgorc')
      .insert({'moderation':true})
      .where({'key':imgKey})
   .then(data=>{
      console.log(data)
   })
   .catch(error=>{
      console.log(error)
   })
}

module.exports = {
   handleCloudNote: handleCloudNote 
};
