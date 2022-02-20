const express = require('express');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const shortLinkValidation = require('../../validations/shortlink.validation')
const userController = require('../../controllers/user.controller');
const shortLinkController = require('../../controllers/shortlink.controller');
const router = express.Router();

router.post('/register', validate(userValidation.register), userController.register);
router.post('/login', validate(userValidation.login), userController.login);
router.post('/logout',auth(),userController.logout);


router.post('/createShortlink', auth(),validate(shortLinkValidation.createShortlink), shortLinkController.createShortlink);
router.get('/listShortlinks', auth(),validate(shortLinkValidation.listShortlinks), shortLinkController.listShortlinks);
router.get('/searchShortlink',auth(), validate(shortLinkValidation.searchShortlink), shortLinkController.searcShortlink);
router.get('/getShortlink',auth(),validate(shortLinkValidation.getShortlink), shortLinkController.getShortlink);
router.delete('/deleteShortlink',auth(), validate(shortLinkValidation.deleteShortlink), shortLinkController.deleteShortlink);

router.get('/test', async (req, res) => {
    res.json({message: 'pass!'})
  })

module.exports = router;