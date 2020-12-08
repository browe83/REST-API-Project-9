const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Course, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a "first name"',
        },
        notEmpty: {
          msg: 'Please provide a "first name"',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a "last name"',
        },
        notEmpty: {
          msg: 'Please provide a "last name"',
        },
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'An email already exists for this account',
      },
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address',
        },
        notNull: {
          msg: 'Please provide a "email addresss"',
        },
        notEmpty: {
          msg: 'Please provide a "email addresss"',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hashedPassword);
      },
      validate: {
        notNull: {
          msg: 'Please provide a "password"',
        },
        notEmpty: {
          msg: 'Please provide a "password"',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
