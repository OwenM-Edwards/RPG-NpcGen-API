const handleAddRoleplay  = (req, res, db,) => {
   let roleplay = req.body.roleplay;
   db('descroleplay')
      .insert({'roleplay': roleplay})
      .then(data=>{
         res.status(200).json('Success')
      })
   .catch(error => res.status(400).json('duplicate'))
}

module.exports = {
   handleAddRoleplay: handleAddRoleplay
};