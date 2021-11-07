const User = require('./User');
const Post = require('./Post');
const Reply = require('./Reply');

// User and Post relationship
User.hasMany(Post, { foreignKey: 'user_id' });

Post.belongsTo(User, { foreignKey: 'user_id' });

// Post and Reply relation
Post.hasMany(Reply, { foreignKey: 'post_id' });

Reply.belongsTo(Post, { foreignKey: 'post_id' });

// Reply and User relation
Reply.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Reply, { foreignKey: 'user_id' });


module.exports = { User, Post, Reply };