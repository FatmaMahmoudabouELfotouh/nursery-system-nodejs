

const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login endpoint
 *     description: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post("/login", authController.login);

module.exports = router;
