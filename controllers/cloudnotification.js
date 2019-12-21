const handleCloudNotification = (req, res, db,) => {
   let saveToDb = req.body
   db('test_table')
         .insert({'test': 'hey'})
         .then(data=> {
            res.status(200).json('success')
         })
         .catch(error=>{
            res.status(800).json('duplicate last name')
         })
}
