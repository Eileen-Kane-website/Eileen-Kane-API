const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/user-service');
const logging = require('../utils/logging');

const NAMESPACE = 'auth controller';

module.exports = Router()
  .post('/signup', (req, res, next) => {
    logging.info(NAMESPACE, 'POST signup called');
    UserService
      .signup(req.body)
      .then(user => {
        const token = UserService.authToken(user);
        res.send({ ...user.toJSON(), token });
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    logging.info(NAMESPACE, 'POST login called');
    UserService
      .authorize(req.body)
      .then(user => {
        const token = UserService.authToken(user);
        res.send({ ...user.toJSON(), token });
      })
      .catch(next);
  })


  .get('/verify', ensureAuth, (req, res) => {
    logging.info(NAMESPACE, 'GET verify called');
    res.send(req.user);
  });
