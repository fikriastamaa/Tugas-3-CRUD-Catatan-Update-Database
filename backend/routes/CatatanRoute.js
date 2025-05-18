import express from 'express';
import { getCatatan, createCatatan, updateCatatan, deleteCatatan } from '../controllers/CatatanController.js';
import { login, register, logout } from '../controllers/UserController.js';
import { verifyToken } from '../middleware/VerifyToken.js'; 
import { refreshToken } from '../controllers/RefreshToken.js';

const router = express.Router();

router.get('/catatan', verifyToken, getCatatan);
router.post('/catatan', verifyToken, createCatatan);
router.put('/catatan/:id', verifyToken, updateCatatan);
router.delete('/catatan/:id', verifyToken, deleteCatatan);

router.get("token", refreshToken);
router.post("/login", login);
router.post("/register", register); 
router.get("/logout", verifyToken, logout);

export default router;