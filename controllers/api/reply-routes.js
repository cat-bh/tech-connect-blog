const router = require('express').Router();
const {User, Post, Reply} = require('../../models');

//get all replies
router.get('/', (req, res) => {
    Reply.findAll({})
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Post a Reply
router.post('/', (req, res) => {
    // If no longer logged in prompt them to login
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    Reply.create({
        body: req.body.body,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
        .then(dbReply => res.json(dbReply))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    
});

module.exports = router;