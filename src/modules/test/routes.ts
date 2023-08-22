import express from "express";
export const router = express.Router();
import * as controller from './controllers'
import { exceptionHandler } from "../../util/exceptionHandler";
import bodyParser from 'body-parser';



router.use(bodyParser.json())
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.get('/show', exceptionHandler(controller.root))
router.get('/showjson', exceptionHandler(controller.showJson))
router.put('/modifyjson', exceptionHandler(controller.modifyJson))
router.put('/deletejson', exceptionHandler(controller.deleteJson))
