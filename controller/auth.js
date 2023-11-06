import * as userRepository from '../data/auth.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

// 설정파일로 적용할 예정
const jwtSecretKey = 'abcdef!@#$%^&*()'
const jwtExpiresInDays = '2d'
const bcryptSaltRounds = 12


// 내 코드
// export async function signup(req, res, next) {
//     const  {username, password, name, email} = req.body;
//     const pw = bcrypt.hashSync(password, 10);
//     const user = await authRepository.createAccount(username, pw, name, email);
//     if(user){
//         res.status(200).json(user)
//     }else{
//         res.status(400).json({message:`not found`})
//     }
// }


export async function signup(req, res) {
    const  {username, password, name, email, url} = req.body;
    const pw = bcrypt.hashSync(password, 10);
    const found = await userRepository.findByUsername(username);
   if(found){
    return res.status(409).json({message : `${username}이 이미 가입되었음`})
   }
   const hashed = await bcrypt.hash(password, bcryptSaltRounds)
   const userId = await userRepository.createUser({
    username,
    password : hashed,
    name,
    email,url
   })
   const token = createJwtToken(userId)
   res.status(201).json( { token, username})
}

function createJwtToken(id){
    return jwt.sign({ id }, jwtSecretKey, {expiresIn : jwtExpiresInDays})
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

export async function me(req,res,next){
    const user = await userRepository.findById(req.userId)
    if (!user){
        return res.status(404).json({message: '사용자를 찾을 수 없음'})
    }
    res.status(200).json({ token : req.token, username: user.username})
}
