const cors = require('cors');
var express = require('express');
var router = express.Router();
const UserController = new (require('../controllers/userController'))()

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const result = await UserController.getAllUsers(req, res)
  res.json(result)
});

router.post('/register', async function(req, res, next) {
  const result = await UserController.registerUser(req, res)
  res.json(result)
});

router.post('/login', async function(req, res, next) {
  const result = await UserController.loginUser(req, res)
  res.status(result.status).json(result.data)
});

router.post('/profile', async function(req, res, next) {
  const result = await UserController.getUserProfile(req, res)
  console.log(result)
  res.status(result.status).json(result.data)
});

// //Delete use
// router.patch('/:id', async function(req, res, next) {
//   const user = await User.findById(req.params.id).where('status').ne(0).exec()
//   //update user status to 0
//   if(!user){
//     return res.status(400).json({message: "User not found"})
//   }
//   user.status = 0
//   const updatedUser = await user.save()
//   res.status(201).json(updatedUser)
// });

module.exports = router;
