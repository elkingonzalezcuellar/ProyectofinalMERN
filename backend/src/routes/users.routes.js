const { Router } = require('express');
const router = Router();

const {
          singup,
          signin,
          getUsers,
} = require('../controllers/users.controller')



// Routes
router.route('/')
    .post(singup)
    .get(getUsers);

router.route('/users/signin').post(signin);



module.exports = router;