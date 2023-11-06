import express from 'express'
import {validationResult} from "express-validator"
import { isAuth} from '../middleware/auth.js '

export const validate = (req,res,next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()){
        return next()
    }
    return res.status(400).json({message:errors.array()[0].msg})
}