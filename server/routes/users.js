var express = require('express');
var router = express.Router();
const User = require('../models/user')
const userServices = require('../services/userServices')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    const result = await User.find();
    res.status(200).json(result)
  }catch(e){
    res.status(500).json({message: e.message})
  }
  // res.send('respond with a resource');
});

router.post('/register', async function(req, res, next) {
  try{
    const hashPassword = userServices.encryptPassword(req.body.password)
    const user = new User({
      username: req.body.username,
      password: hashPassword
    })
    const newUser = await user.save()
    res.status(201).json(newUser)
  }catch(e){
    res.status(400).json({message: "User exist"})
  }
});

router.post('/login', async function(req, res, next) {
  try{
    //find user by username
    const user = await User.findOne({username: req.body.username}).exec()
    if(!user){
      return res.status(400).json({message: "User not found"})
    }
    //compare password
    const isMatch = userServices.comparePassword(req.body.password, user.password)
    if(!isMatch){
      return res.status(400).json({message: "Incorrect password"})
    }
    res.status(201).json(user)
  }
  catch(e){

  }
});


router.post('/profile', async function(req, res, next) {
  const user = await User.findOne({_id: req.body.id}).exec()
  
  if(!user){
    return res.status(400).json({message: "User not found"})
  }
  res.status(201).json(user)
});

//Delete use
router.patch('/:id', async function(req, res, next) {
  const user = await User.findById(req.params.id).where('status').ne(0).exec()
  //update user status to 0
  if(!user){
    return res.status(400).json({message: "User not found"})
  }
  user.status = 0
  const updatedUser = await user.save()
  res.status(201).json(updatedUser)
});


module.exports = router;
