import bcrypt from "bcrypt";

let users = [
    {
        id : '1',
        username : 'apple',
        password : '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name : '김사과',
        email : 'apple@apple.com',
        url : 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    }
]


export async function createAccount(username,password,name,email){
    const user = {
        id : "2",
        username,
        password,
        name,
        email,
        url : 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    }
    users = [user, ...users]
    return users;
}


export async function login_confirm(username, password){
    const user = users.find((user) => user.username === username);
    if(user){
        if(bcrypt.compareSync(password,user.password)){
            return user
        }
    }
}

