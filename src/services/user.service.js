const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Login and get token by email & password
 * 
 * @param {string} email Email from which account is created
 * @param {string} password Password
 * @returns {Promise<User>}
 */
const login = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout this method can remove token from cookies but as it's backend only process and we are testing API with postman we can't do that.
 * 
 * @returns {Promise}
 */
const logout = async () => {

};
/**
 * Create a user by checking if email is not already registered
 * 
 * @param {object} userBody It contains Email, Password (Which will saved in hash format), name
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Use this function get User object via email id
 * 
 * @param {string} email Email id to search for
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Use this function get User object via user id
 * 
 * @param {string} id User id to search for
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};
module.exports = {
  login,
  logout,
  createUser,
  getUserByEmail,
  getUserById
};
