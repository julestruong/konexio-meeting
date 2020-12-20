var { DataTypes } = require('sequelize');

// sequelize.sync({ force: true });
module.exports = (sequelize) => {
  sequelize.define('User', {
    // Model attributes are defined here
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordConfirmation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    // Other model options go here
  });
};
