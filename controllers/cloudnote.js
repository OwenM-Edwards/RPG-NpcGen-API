const handleCloudNote = (req, res, db,) => {
   if(req.body.moderation_status === 'approved') {
      let imgKey = req.body.public_id;
      console.log('Moderation approved')

      searchHumanTable(imgKey, db);
      searchOrcTable(imgKey, db);

   } else {
      console.log('Moderation not approved');
   }
}

searchHumanTable = (imgKey, db) =>{
   db('imghuman')
      .where({'key':imgKey})
      .update({'moderation':true})
   .then(data=>{
   })
   .catch(error=>{
   })
}
searchOrcTable = (imgKey, db) =>{
   db('imgorc')
      .where({'key':imgKey})
      .update({'moderation':true})
   .then(data=>{
   })
   .catch(error=>{
   })
}

module.exports = {
   handleCloudNote: handleCloudNote 
};
