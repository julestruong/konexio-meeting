const { models } = require('../database/sequelize');

const addUser = async (user) => {
  return await models.User.create({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    passwordConfirmation: user.password_conf,
    newsletter: user.newsletter || false,
    status: user.status,
  });
};

const findUser = async (userId) => {
  return await models.User.findByPk(userId)
};

const findAll = async () => {
  return await models.User.findAll();
}

const setPicture = async (userId, pictureUrl) => {
  return await models.User.update({picture: pictureUrl}, {where: {id:userId}});
};

const updateUser = async (userId, firstname) => {
  return await models.User.update({firstname}, {where: {id:userId}});
};

module.exports = { addUser, findUser, findAll, setPicture, updateUser };