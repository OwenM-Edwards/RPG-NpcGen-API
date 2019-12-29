const handleCloudNote = (req, res, db,) => {
   if(req.body.moderation_status === 'approved') {

      db('testing')
         .insert({'url':req.body.url})
         .then(data=>{
            res.status(200).json({ success: true})
         }) 
         .catch(error=>{
            console.log(error)
            res.status(405).json({ success: false})
         })
   } else {
      console.log('no');
   }
}

module.exports = {
   handleCloudNote: handleCloudNote
};
