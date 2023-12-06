const express = require('express'),
router = express.Router(),
{    
    signUp,
    login,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/User.controller')
const auth = require ('../middlewares/auth')

router.post('/', auth, signUp)
router.post('/',auth, login)
router.get('/', auth, getUser)
router.put('/', auth, updateUser)
router.delete('/', auth, deleteUser)

module.exports = router;