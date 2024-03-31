const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("fullname")
    .isString()
    .withMessage("Teacher fullName should be a string")
    .isLength({ min: 2 })
    .withMessage("Teacher fullName length should be greater than 2"),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage("Teacher password minimum length is 8"),

  body('email')
    .isEmail()
    .withMessage("Teacher email is invalid"),
];

exports.updateValidator = [
  
  body("fullname")
    .optional()
    .isString()
    .withMessage("Teacher fullname should be a string")
    .isLength({ min: 2 })
    .withMessage("Teacher fullname length should be greater than 2"),
    
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage("Teacher password minimum length is 8"),

  body('email')
    .optional()
    .isEmail()
    .withMessage("Teacher email is invalid"),
];

exports.deleteValidator = [
  param('id')
    .isMongoId()
    .withMessage('Teacher ID must be an objectID')
];

exports.getByIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Teacher ID must be an objectID')
];
