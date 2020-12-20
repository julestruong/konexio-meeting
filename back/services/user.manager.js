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
  return await models.User.findByPk(userId);
};

const findUserByEmail = async (email) => {
  return await models.User.findOne({ where: { email } });
};

const findUserByToken = async (token) => {
  return await models.User.findOne({ where: { accessToken: token } });
};

const findAll = async () => {
  return await models.User.findAll({ order: [['id', 'DESC']] });
};

const setPicture = async (userId, pictureUrl) => {
  return await models.User.update(
    { picture: pictureUrl },
    { where: { id: userId } },
  );
};

const updateUserFirstname = async (userId, firstname) => {
  return await models.User.update({ firstname }, { where: { id: userId } });
};

const updateUserToken = async (email, token) => {
  return await models.User.update(
    { accessToken: token },
    { where: { email: email } },
  );
};

module.exports = {
  addUser,
  findUserByEmail,
  findUser,
  findUserByToken,
  findAll,
  setPicture,
  updateUser: updateUserFirstname,
  updateUserToken,
};
