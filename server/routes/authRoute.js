import express from 'express';
import { authenticateUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

// If we want implementation in the same file.However this is not recommended.
// router.get("/", (req, res) => {
//     res.send("Auth router is accessibale.")
// })

router.post("/signup", registerUser);
router.post("/login", authenticateUser);

// We can define routes in following manner also.
// router.route('/').post(registerUser);

export default router;