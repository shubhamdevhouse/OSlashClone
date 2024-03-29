const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {  userService, tokenService } = require('../services');


const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  });
  
  const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  });
  
  const logout = catchAsync(async (req, res) => {
    await userService.logout();
    res.status(httpStatus.NO_CONTENT).send();
  });

module.exports = {
 register,
 login,
 logout
};