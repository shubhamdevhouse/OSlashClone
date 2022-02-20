const Joi = require('joi');
const pickObject = require('../utils/pickObject');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const validate = (schema)=>(req,res,next)=>{
    const validSchema = pickObject(schema,['params','query','body']);
    const object = pickObject(req,Object.keys(validSchema));
    const {error,value} = Joi.compile(validSchema)
        .prefs({errors:{label:'key'},abortEarly:false})
        .validate(object);

    if(error) {
        const errorMsg = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST,errorMsg));
    }
    Object.assign(req,value);
    return next();

};
module.exports = validate;