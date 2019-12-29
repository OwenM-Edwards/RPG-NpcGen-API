const handleCloudNote = (req, res, db,) => {
   if(req.body.moderation_status === 'approved') {
      console.log(req.body)

      db({a:'imghuman', b:'imgorc'})
         .insert({'moderation':true})
         .where(a.key, req.body.public_id)
         .where(b.key, req.body.public_id)
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
