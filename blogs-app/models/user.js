const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'user',
    timestamps: true
})

module.exports = User