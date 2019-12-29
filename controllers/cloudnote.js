const handleCloudNote = (req, res, db,) => {
   if(req.body.moderation_status === 'approved') {
      console.log(req.body)

      // db('img' + req.body.)
      //    .insert({'moderation':true})
      //    .where({'key':req.body.public_id})
      //    .then(data=>{
      //       res.status(200).json({ success: true})
      //    }) 
      //    .catch(error=>{
      //       console.log(error)
      //       res.status(405).json({ success: false})
      //    })
   } else {
      console.log('no');
   }
}

module.exports = {
   handleCloudNote: handleCloudNote
};
