// Require dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections.js');
const moment = require('moment');

// Adds a class model for Post
class Post extends Model {}

// Initializes the table how each column will function
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        hooks: {
            beforeCreate: async (newPost) => {
                newPost.createdAt = moment().format('MMM Do, YYYY h:mm a');
                return newPost;
            },
            beforeUpdate: async (updatedPost) => {
                return updatedPost;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
)

module.exports = {Post}