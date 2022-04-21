import express from "express";
import {login, refreshToken, register} from "../controllers/auth.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', refreshToken);

export default router;