import express from 'express'
import getTrainlist from '../controller/trainListController.js';

const router = express.Router();

router.post('/trainlist', getTrainlist);

export default router;