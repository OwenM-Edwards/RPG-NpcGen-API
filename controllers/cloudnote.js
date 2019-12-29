const handleCloudNote = (req, res, db,) => {
   if(req.body.moderation_status === 'approved') {
      console.log(req.body.url)
      db('testing')
      .insert({'url': "hello"})
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

module.exports = {
   handleCloudNote: handleCloudNote
};
