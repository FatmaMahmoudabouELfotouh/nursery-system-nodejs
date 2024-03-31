const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("_id").isInt().withMessage("child Id should be integer"),
  body("fullname")
    .isString()
    .withMessage("child Name should be string")
    .isLength({ min: 2 })
    .withMessage("child Name should contain at least 2 chars"),
  body("age").isInt().withMessage("child age should be integer"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("child level should be one of [PreKG,KG1, KG2]"),
  body("address")
    .isObject()
    .withMessage(
      "address should be an object with { city: String, street: String, building: String }"
    ),

  body("address.city")
    .isString()
    .withMessage(
      "address should be an object with { city: String, street: String, building: Numeric }"
    ),
  body("address.street")
    .isString()
    .withMessage(
      "address should be an object with { city: String, street: String, building: Numeric }"
    ),
  body("address.building")
    .isNumeric()
    .withMessage(
      "address should be an object with { city: String, street: String, building: Numeric }"
    ),
];
exports.updateValidator = [
  body("_id")
  .optional()
  .isInt()
  .withMessage("Child Id should be int"),
  body("fullname")
    .optional()
    .isString()
    .withMessage("child Name should be string")
    .isLength({ min: 2 })
    .withMessage("child Name should contain at least 2 chars"),
  body("age").optional().isInt().withMessage("child age should be integer"),
  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("child level should be one of [PreKG,KG1, KG2]"),
  body("address")
    .optional()
    .isObject()
    .withMessage(
      "address should be an object with { city: String, street: String, building: Numeric }"
    ),
  body("address.city")
    .optional()
    .isString()
    .withMessage(
      "address should be an object with { city: String, street: String, building: Numeric }"
    ),
  body("address.street")
    .optional()
    .isString()
    .withMessage(
      "address should be an object with { city: String, street: String, building: Numeric }"
    ),
  body("address.building")
    .optional()
    .isNumeric()
    .withMessage(
      "address should be an object with { city: String, street: String, building: Numeric }"
    ),
];
exports.deleteValidator = [param('id').isInt().withMessage('Child id Must be an int')];

exports.getByIdValidator = [param('id').isInt().withMessage('Child id Must be an int')];