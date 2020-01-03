const handleCloudNote = (req, res, db,) => {
   if(req.body.moderation_status === 'approved') {
      let imgKey = req.body.public_id;
      console.log('Moderation approved')

      searchHumanTable(imgKey, db,res);
      searchOrcTable(imgKey, db,res);

   } else {
      console.log('Moderation not approved');
   }
}

searchHumanTable = (imgKey, db,res) =>{
   db('imghuman')
      .where({'key':imgKey})
      .update({'moderation':true})
   .then(data=>{
      res.status(200)
   })
   .catch(error=>{
      res.status(500)
   })
}
searchOrcTable = (imgKey, db,res) =>{
   db('imgorc')
      .where({'key':imgKey})
      .update({'moderation':true})
   .then(data=>{
      res.status(200)
   })
   .catch(error=>{
      res.status(500)
   })
}

module.exports = {
   handleCloudNote: handleCloudNote 
};
