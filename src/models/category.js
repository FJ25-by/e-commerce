const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Category extends Model {}

Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('food', 'beverage'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Category',
});

module.exports = Category;