const express = require("express");
const classController = require("../controllers/classController");
const { getByIdValidator, insertValidator } = require("../MiddleWares/validations/classValidations");
const validator = require("../MiddleWares/validations/validator");

const router = express.Router();
const isAuth = require("../MiddleWares/authrMW");
const { isTeacher, isAdmin } = require("../MiddleWares/authrMW");

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
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

// Define other routes similarly

module.exports = router;
