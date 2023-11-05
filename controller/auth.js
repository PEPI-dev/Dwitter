import * as authRepository from '../data/auth.js'
import bcrypt from "bcrypt";

export async function signup(req, res, next) {
    const  {username, password, name, email} = req.body;
    const pw = bcrypt.hashSync(password, 10);
    const user = await authRepository.createAccount(username, pw, name, email);
    if(user){
        res.status(200).json(user)
    }else{
        res.status(400).json({message:`not found`})
    }
}

export async function login(req, res, next){
    const { username, password } = req.body;
    const user = await authRepository.login(username, password);
    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(400).json({message: "아이디 또는 비밀번호를 확인해주세요."})
    }
}

