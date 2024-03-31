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
   *     description: Retrieve all teachers
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
   *     description: Add a new teacher
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
   *         description: The created teacher
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
   * /teachers:
   *   delete:
   *     security:
   *       - bearerAuth: []
   *     description: Delete a teacher
   *     responses:
   *       200:
   *         description: Teacher deleted successfully
   */
  .delete(isAuth, isAdmin, teacherController.deleteTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     description: Update a teacher
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
 *         description: Updated teacher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
router.put(
  '/teachers/:id',
  upload.single("image"),
  isAuth,
  isAdmin,
  teacherController.updateTeacher
);
/**
 * @swagger
 
 * /teachers/change-password:
 *   post:
 *     description: Change the password of a teacher
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the teacher whose password needs to be changed.
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *                 description: The new password for the teacher.
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.post('/teachers/change-password', isAuth, teacherController.changePassword);
module.exports = router;
