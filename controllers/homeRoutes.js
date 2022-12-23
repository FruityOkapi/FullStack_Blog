const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        const posts = postData.map((post) => post.get({ plain: true }));
        

        res.render('home_posts', { 
            posts
          });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: []
        })

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dash_posts', { 
            posts
          });

    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/login', async (req, res) => {
    try {
        res.render('login');

    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/logout', async (req, res) => {})

module.exports = router;