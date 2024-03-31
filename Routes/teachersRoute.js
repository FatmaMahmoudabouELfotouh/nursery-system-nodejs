const express = require("express");
const upload = require("../MiddleWares/multerConfig");
const teacherController = require("../controllers/teacherController");
const {
  insertValidator
} = require("../MiddleWares/validations/teacherValidation");
const validator = require("../MiddleWares/validations/validator");

const router = express.Router();

const isAuth = require("../MiddleWares/authrMW");
const { isTeacher, isAdmin } = require("../MiddleWares/authrMW");

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: The full name of the teacher.
 *         password:
 *           type: string
 *           minLength: 8
 *           description: The password of the teacher.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the teacher.
 *         image:
 *           type: string
 *           format: binary
 *           description: The image file of the teacher.
 *       required:
 *         - fullname
 *         - password
 *         - email
 */

router
  .route("/teachers")
  /**
   * @swagger
   * /teachers:
   *   get:
   *     security:
   *       - bearerAuth: []
   *     description: Returns all teachers
   *     responses:
   *       200:
   *         description: A list of teachers
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Teacher'
   */
  .get(isAuth, isAdmin, teacherController.getAllTeachers)
  /**
   * @swagger
   * /teachers:
   *   post:
   *     description: add teacher
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               fullname:
   *                 type: string
   *               password:
   *                 type: string
   *                 minLength: 8
   *               email:
   *                 type: string
   *                 format: email
   *               image:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: update teacher
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Teacher'
   */
  .post(
    upload.single("image"),
    insertValidator,
    validator, 
    teacherController.addTeacher
  )
  /**
   * @swagger
   * /teachers/{:_id}:
   *   put:
   *     description: update teacher
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the teacher to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               fullname:
   *                 type: string
   *               password:
   *                 type: string
   *                 minLength: 8
   *               email:
   *                 type: string
   *                 format: email
   *               image:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: update teacher
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Teacher'
   */
  router.put('/teachers/:id',
    upload.single("image"),
    isAuth,
    isAdmin,
    teacherController.updateTeacher
  )
  /**
   * @swagger
   * /teachers:
   *   delete:
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *     description: delete teacher
   *     responses:
   *       200:
   *         description: delete teacher
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Teacher'
   */
  .delete(isAuth, isAdmin, teacherController.deleteTeacher);

// Get teacher by ID
/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a teacher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher not found
 */
router.get("/teachers/:id", teacherController.findTeacherById);

module.exports = router;
