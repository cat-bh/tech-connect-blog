const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const replyRoutes = require('./reply-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
//router.use('/reply', replyRoutes);

module.exports = router;