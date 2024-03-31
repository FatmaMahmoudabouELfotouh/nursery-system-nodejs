const express = require("express");
const childController = require("../controllers/childController");
const {
  insertValidator,
  updateValidator,
  deleteValidator,
  getByIdValidator,
} = require("../MiddleWares/validations/childValidation");
const validator = require("../MiddleWares/validations/validator");

const isAuth = require("../MiddleWares/authrMW");
const { isTeacher ,isAdmin} = require("../MiddleWares/authrMW");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullname:
 *           type: string
 *         age:
 *           type: integer
 *         level:
 *           type: string
 *           enum: [PreKG, KG1, KG2]
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             street:
 *               type: string
 *             building:
 *               type: string
 *       required:
 *         - _id
 *         - name
 *         - age
 */
/**
 * @swagger
 * /childrens:
 *   get:
 *     summary: Retrieve a list of children
 *     description: Returns a list of children
 *     responses:
 *       200:
 *         description: A list of children
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 */

router.get(
  "/childrens",
  isAuth, // Ensure authentication
  isAdmin, // Ensure user is admin 
  childController.getAllChildren
);


/**
 * @swagger
 * /childerns:
 *   post:
 *     summary: Add a new child
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       201:
 *         description: Child added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 */
router.post(
  "/childerns",
   isAuth, // Ensure authentication
  isAdmin, // Ensure user is admin 
  insertValidator, // Validate request body for insertion
  validator, // Run validation
  childController.addChild
);

/**
 * @swagger
 * /childerns:
 *   put:
 *     summary: Update an existing child
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: Child updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 */
router.put(
  "/childerns",
  isAuth, // Ensure authentication
  isAdmin, // Ensure user is admin 
  updateValidator, // Validate request body for updating
  validator, // Run validation
  childController.updateChild
);

/**
 * @swagger
 * /childerns:
 *   delete:
 *     summary: Delete a child by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the child to delete
 *     responses:
 *       204:
 *         description: Child deleted successfully
 */
router.delete(
  "/childerns",
   isAuth, // Ensure authentication
  isAdmin, // Ensure user is admin 
  deleteValidator, // Validate request parameters for deletion
  validator, // Run validation
  childController.deleteChild
);

/**
 * @swagger
 * /childerns/{id}:
 *   get:
 *     summary: Get a child by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the child to retrieve
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       404:
 *         description: Child not found
 */
router.get(
  "/childerns/:id",
  isAuth, 
  isAdmin, 
  getByIdValidator, 
  validator, 
  childController.findChildById
);

module.exports = router;
