const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createShortlink = {
    body: Joi.object().keys({
      shortlink: Joi.string().required(),
      description: Joi.string().required(),
      url: Joi.string().required(),
      tags:  Joi.array().optional()
    }),
  };

  const listShortlinks = {
    query: Joi.object().keys({
      limit:Joi.number().integer(),
      page: Joi.number().integer()
    }),
  };

  const getShortlink = {
      query: Joi.object().keys({
        shortlink:Joi.string().required()
      })
  }

  const deleteShortlink = {
    query: Joi.object().keys({
        shortlink: Joi.string().required()
    }),
  };
  const searchShortlink = {
    query: Joi.object().keys({
      keyword: Joi.string().required()
    }),
  };
  module.exports = {
    createShortlink,
    listShortlinks,
    getShortlink,
    deleteShortlink,
    searchShortlink
  };