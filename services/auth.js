const UserModel = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class ForbiddenException extends Error {
  constructor() {
    super("Not allowed");
  }
}

class BadRequestException extends Error {
  constructor() {
    super("Bad request");
  }
}

async function validate(emailOrUsername, password) {
  const user = await UserModel.findOne({
    $or: [{ email: emailOrUsername }, { userName: emailOrUsername }],
  });

  if (!user) return null;

  return (await bcrypt.compare(password, user.password)) ? user : null;
}

async function login(emailOrUsername, password) {
  const userData = await validate(emailOrUsername, password);

  if (!userData) {
    throw new ForbiddenException();
  }

  const accessToken = jsonwebtoken.sign(JSON.stringify(userData), process.env.SECRET);

  return {
    accessToken,
    user: userData,
  };
}

async function register(registerData) {
  const user = {
    userName: registerData.userName,
    email: registerData.email,
    password: registerData.password,
  };

  let createdUser;
  try {
    createdUser = await UserModel.create(user);
  } catch (error) {
    console.error(error);
    throw new BadRequestException(error.message);
  }

  const accessToken = jsonwebtoken.sign(JSON.stringify(createdUser), process.env.SECRET);

  return {
    accessToken,
    user: createdUser,
  };
}

module.exports = {
  login,
  register,
  BadRequestException,
  ForbiddenException
}