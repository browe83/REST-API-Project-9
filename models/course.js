'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
    }
  };
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"',
        },
        notEmpty: {
          msg: 'Please provide a value for "title"',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "description"',
        },
        notEmpty: {
          msg: 'Please provide a value for "description"',
        },
      },
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};