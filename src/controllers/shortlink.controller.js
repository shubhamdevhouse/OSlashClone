const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pickObject = require('../utils/pickObject');
const { shortlinkService } = require('../services');


const createShortlink = catchAsync(async (req, res) => {
  
    const shortlink = await shortlinkService.createShortlink(req.body,req.user);
    res.status(httpStatus.CREATED).send({ shortlink});
  });
  
  const listShortlinks = catchAsync(async (req, res) => {
    const result = await shortlinkService.getShortlinks({user:req.user});
    res.send(result);
  });
  const searcShortlink = catchAsync(async (req, res) => {
    const result = await shortlinkService.searchShortlink(req.query.keyword,req.user);
    res.send(result);
  });
  const getShortlink = catchAsync(async (req, res) => {
    const result = await shortlinkService.getShortlink(req.query.shortlink,req.user);
    res.send(result);
  });
  const deleteShortlink = catchAsync(async (req, res) => {
    const result = await shortlinkService.deleteShortlink(req.query.shortlink,req.user);
    res.send(result);
  });

  
module.exports = {
    createShortlink,
    listShortlinks,
    searcShortlink,
    getShortlink,
    deleteShortlink
};