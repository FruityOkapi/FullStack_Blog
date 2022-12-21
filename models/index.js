// Require Models
const {User} = require('./User');
const {Post} = require('./Post');
const {Comment} = require('./Comment');

// Post belongs to user
Post.belongsTo(User, {
    foreignKey: user_id
});

// User has many posts
User.hasMany(Post, {
    foreignKey: user_id
});

// Posts have many comments
Post.haveMany(Comment, {
    foreignKey: 'post_id'
});

// Comment belongs to post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// User has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

module.exports = {User, Post, Comment};