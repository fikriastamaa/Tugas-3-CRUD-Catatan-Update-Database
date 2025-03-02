import express from 'express';
import { getCatatan, createCatatan, updateCatatan, deleteCatatan } from '../controllers/CatatanController.js';

const router = express.Router();

router.get('/catatan', getCatatan);
router.post('/catatan', createCatatan);
router.put('/catatan/:id', updateCatatan);
router.delete('/catatan/:id', deleteCatatan);

export default router;