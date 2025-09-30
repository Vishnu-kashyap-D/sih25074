const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

let User;

try {
  const { sequelize } = require('../config/db');

  User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    farmDetails: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        totalAcres: 0,
        crops: [],
        farmingType: 'conventional'
      }
    },
    role: {
      type: DataTypes.ENUM('farmer', 'buyer', 'admin'),
      defaultValue: 'farmer'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    }
  });

  // Instance methods
  User.prototype.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.toJSON = function() {
    const user = { ...this.get() };
    delete user.password;
    return user;
  };

} catch (error) {
  console.warn('⚠️ Sequelize User model failed, using mock:', error.message);
  const { MockUser } = require('../config/mockDb');
  User = MockUser;
}

module.exports = User;