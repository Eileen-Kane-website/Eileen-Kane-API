const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async({ email, password }) => {
  const passwordHash = await bcrypt.hash(password, Number (process.env.SALT_ROUNDS));
  console.log('pas-hash', passwordHash);
  const addUser = await User.insert({
    email,
    passwordHash
  });
  return addUser;
};

const authorize = async({ email, password }) => {
  const user = await User.findByEmail(email);

  if(!user) throw new Error('Invalid user/password');

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if(!validPassword) throw new Error('Invalid user/password');

  return user;
};

const authToken = user => {
  const token = jwt.sign({
    payload: user.toJSON()
  }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });
  return token;
};

const verifyToken = token => {
  const { payload } =  jwt.verify(token, process.env.APP_SECRET);
  return payload;
};

module.exports = {
  signup,
  authorize,
  authToken,
  verifyToken
};
