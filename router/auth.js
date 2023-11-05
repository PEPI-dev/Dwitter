import express from "express"
import * as tweetController from '../controller/tweet.js'
import * as authController from '../controller/auth.js'
import {body,param, validationResult} from 'express-validator'
import {validate} from "../middleware/validator.js"
import bcrypit from "bcrypt"

const Authvalidate = [
    body('username').trim().isLength({min:5}).withMessage('5글자 이상'), validate,
    body('password').trim().isLength({min:5}).withMessage('5글자 이상'), validate,
    body('email').trim().isEmail().withMessage('이메일 형식 맞추기!')
]


const router = express.Router()


router.post('/signup', Authvalidate,authController.signup)
router.post('/login', authController.login)
/*
회원가입
    router.post('/signup', ...) // CRUD 중 Create

로그인
    router.post('/login',...)

JWT 확인
    router.get('/me', ...)

*/




export default router