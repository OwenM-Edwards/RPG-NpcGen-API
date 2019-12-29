const handleCloudNote = (req, res, db,) => {
   if(req.body.moderation_status === 'approved') {
      db('testing')
      .insert({height: req.body.version})
      .then(data=> {
         res.status(200).json({ success: true})
      }) 
      .catch(error=>{
         res.status(405).json({ success: false})
      })
   } else {
      console.log('no');
   }
}
