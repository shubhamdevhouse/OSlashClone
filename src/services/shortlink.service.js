const httpStatus = require('http-status');
const { Shortlink } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get the full object including full url via shortlink
 * 
 * @param {string} shortlink Shortlink to search
 * @param {string} user User Object Id
 * @returns {Promise<Shortlink>}
 */
const getShortlink = async (shortlink,user) => {
    return Shortlink.findOne({shortlink,user});
};

/**
 * Search shortlink using keyword to be search in fields shortlink, description and tags array
 * It will only search for shortlink which are created by same user who is logged in using token
 * 
 * @param {string} keyword Keyword String
 * @param {string} user User Object Id
 * @returns {Promise<Shortlink>}
 */
const searchShortlink = async (keyword,user) => {
    const regex = new RegExp(keyword,'i');
     return Shortlink.find({"$and":[
            { "$or": 
            [{ "shortlink" : regex},
            { "description" : regex},
            { "tags" : regex}]},
            {"user":user}]});
};

/**
 * Get all shortlinks created by the same user who is logged in with pagination
 * 
 * @param {string} filter Filter Inlcudes UserId
 * @returns {Document[]}
 */
const getShortlinks = async (filter) => {
    const shortlinks = await Shortlink.find(filter);
    return shortlinks;
  };


/**
 * Create shortlink with shortlink name, url (Full url), description, tags (Optional)
 * 
 * @param {object} shortlinkBody It Contains shortlink, url, description, tags parameters
 * @param {string} user UserId
 * @returns {Promise<Shortlink>}
 */
const createShortlink = async (shortlinkBody,user) => {
    
    if (await Shortlink.isShortlinkTaken(shortlinkBody.shortlink)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Shortlink already taken');
    }
    shortlinkBody.user = user;
    return Shortlink.create(shortlinkBody);
};


/**
 * Delete shortlink using shortlink text in query
 * 
 * @param {string} shortLink Shortlink name
 * @param {string} user UserId
 * @returns {Promise<Shortlink>}
 */
  const deleteShortlink = async (shortLink,user) => {
    const shortlinkObj = await getShortlink(shortLink,user);
    if (!shortlinkObj) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Shortlink not found');
    }
    await shortlinkObj.remove();
    return shortlinkObj;
  };

  module.exports = {
      createShortlink,
      getShortlink,
      searchShortlink,
      getShortlinks,
      deleteShortlink,
  };