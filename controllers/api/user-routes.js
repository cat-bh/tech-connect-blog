const router = require('express').Router();
const {User, Post, Reply} = require('../../models');

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Get a user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with that id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Create a user Sign-up
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbData => {
            req.session.save(() => {
                req.session.user_id = dbData.id;
                req.session.username = dbData.username;
                req.session.loggedIn = true;

                res.json(dbData);
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//login
router.post('/login', (req, res) => {
    // expecting json object with {username: 'username', password: 'password123'}
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with that id'});
                return;
            }

            const correctPassword = dbUserData.checkPassword(req.body.password);
            if(!correctPassword) {
                res.status(400).json({message: 'Wrong credentials'});
                return;
            }

            req.session.save(() => {
                // declare session variables
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
    
                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        })
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
})


module.exports = router;