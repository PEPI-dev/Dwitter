import express from "express"
import * as tweetController from '../controller/tweet.js'
import * as authController from '../controller/auth.js'
import {body,param, validationResult} from 'express-validator'
import {validate} from "../middleware/validator.js"
import { isAuth} from '../middleware/auth.js '

const validateCredential = [
    body('username').trim().notEmpty().withMessage('반드시 입력'),
    body('password').trim().isLength({min:4}).withMessage('4자 이상'),validate
]

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name 반드시 입력'),
    body('email').isEmail().withMessage('email 형식 확인'),
    body('url').isURL().withMessage('URL 형식 확인').optional({nullable: true,checkFalsy: true}),validate
]


const router = express.Router()


router.post('/signup', validateSignup,authController.signup)
router.post('/login', validateCredential,)
router.get('/me', isAuth,authController.me)



export default router