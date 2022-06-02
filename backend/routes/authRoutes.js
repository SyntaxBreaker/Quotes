import express from "express";
import {login, refreshToken, register, logout} from "../controllers/auth.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.delete('/logout', logout);

export default router;