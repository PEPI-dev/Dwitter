import * as authRepository from '../data/auth.js'
import bcrypt from "bcrypt";

export async function signup(req, res, next) {
    const  {username, password, name, email} = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    const user = await authRepository.createAccount(username, hashed, name, email);

    if(user){
        res.status(200).json(user)
    }else{
        res.status(400).json({message:`not found`})
    }
}

