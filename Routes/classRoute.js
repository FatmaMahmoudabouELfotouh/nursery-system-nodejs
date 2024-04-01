const express = require("express");
const classController = require("../controllers/classController");
const { insertValidator, updateValidator, deleteValidator, getByIdValidator } = require("../MiddleWares/validations/classValidations");
const validator = require("../MiddleWares/validations/validator");
const isAuth = require("../MiddleWares/authrMW");
const { isTeacher, isAdmin } = require("../MiddleWares/authrMW");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         _id:
 *           type: interger
 *         name:
 *           type: string
 *         supervisor:
 *           type: integer
 *         children:
 *           type: array
 *           items:
 *             type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: Class management endpoints
 */

/**
 * @swagger
 * /class:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all classes
 *     tags: [Class]
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get("/class", isAuth, isAdmin, classController.getAllClasses);

/**
 * @swagger
 * /class:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new class
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: The created class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */
router.post("/class", isAuth, isAdmin, insertValidator, validator, classController.insertClass);

/**
 * @swagger
 * /class/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: The updated class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */
router.put("/class/:id", isAuth, isAdmin, updateValidator, validator, classController.updateClass);

 /**
 * @swagger
 * /class/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string  
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 */
router.delete("/class/:id", isAuth, isAdmin, deleteValidator, validator, classController.deleteClassById);


/**
 * @swagger
 * /class/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *     responses:
 *       200:
 *         description: The class data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found
 */
router.get("/class/:id", isAuth, getByIdValidator, validator, classController.getClassById);

module.exports = router;
