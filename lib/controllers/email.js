const { Router } = require('express');
const mailService = require('../services/email-service');
const logging = require('../utils/logging');

const NAMESPACE = 'email controller';

module.exports = Router()
  .post('/', (req, res) => {
    logging.info(NAMESPACE, 'POST email called');
    mailService.sendMail(req.body.message)
      .then(({ response }) => {
        if(Number(response.split(' ')[0]) === 250) {
          res.json({
            status: 'success'
          });
        } else {
          res.json({
            status: 'fail'
          });
        }
      });
  });
