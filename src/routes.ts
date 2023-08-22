import express from 'express';
export const router = express.Router();

import { router as test } from './modules/test/routes'
router.use('/test', test)
