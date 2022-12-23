// Require needed dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections.js');
const bcrypt = require('bcrypt')
const moment = require('moment');

// Add a class model for User
class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                newUser.createdAt = moment().format('MMM Do, YYYY h:mm a');
                return newUser;
            },
            beforeUpdate: async (updatedUser) => {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                return updatedUser;
            },
        },
        sequelize,
        timestamps: true,
        updatedAt: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)

module.exports = {User}