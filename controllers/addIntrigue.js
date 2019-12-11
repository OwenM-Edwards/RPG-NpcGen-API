const handleAddIntrigue  = (req, res, db,) => {
   let intrigue = req.body.intrigue;
   db('mod_descintrigue')
      .insert({'intrigue': intrigue})
      .then(data=>{
         res.status(200).json('Success')
      })
   .catch(error => res.status(400).json('duplicate'))
}

module.exports = {
   handleAddIntrigue: handleAddIntrigue
};