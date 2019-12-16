const handleCloudNotification = (req, res, db,) => {
   db('mod_nameshuman')
         .insert({'name': req.body[0]})
         .then(data=> {
            res.status(200).json('success')
         })
         .catch(error=>{
            res.status(800).json('duplicate last name')
         })
}
