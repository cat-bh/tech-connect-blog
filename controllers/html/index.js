const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Reply} = require('../../models');

// Homepage 
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbAllPost => {
            
            const posts = dbAllPost.map(post => post.get({ plain: true }));
            
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// single post page
router.get('/single-post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Reply,
                attributes: ['body', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            // if(!dbPostData) {
            //     res.status(404).json({message: 'No post found with this id'});
            //     return document.location('/');
            // }
            const post = dbPostData.get({plain: true});
            
            //console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login and sign up
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
      res.render('login');
});

module.exports = router;