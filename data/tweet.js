// import * as userRepository from './auth.js'
import SQ from 'sequelize';
import {sequelize} from '../db/database.js'
import {User} from './auth.js'
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
const Tweet = sequelize.define('tweet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull:false
    }
});
Tweet.belongsTo(User);
const INCLUDE_USER = {
    attributes: [
        'id', 'text', 'createdAt', 'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url']
    ],
    include: {
        model: User,
        attributes: [],
    }
}
const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}
// const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';
// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';
// let tweets = [
//     {
//         id: '1',
//         text: '안녕하세요!',
//         createdAt : Date.now().toString,
//         userId:'1'
//     },
//     {
//         id: '2',
//         text: '반갑습니다!',
//         createdAt : Date.now().toString,
//         userId:'2'
//     }
// ];
export async function getAll() {
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const {username, name, url} = await userRepository.findById(tweet.userId);
    //         return { ...tweet, username, name, url };
    //     })
    // );
    // return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
    return Tweet.findAll({  ...INCLUDE_USER, ...ORDER_DESC}); // ...을 붙이는 이유는 객체복사(안의 내용물까지 복사)하기 때문.
}
export async function getAllByUsername(username){
    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
    // return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0]);
    return Tweet.findAll({
        ...INCLUDE_USER, ...ORDER_DESC, include: {
            ...INCLUDE_USER.include, where: {username}
        }
    });
}
export async function getById(id){
    // const found = tweets.find((tweet) => tweet.id === id);
    // if (!found) {
    //     return null;
    // }
    // const { username, name, url } = await userRepository.findById(found.userId);
    // return { ...found, username, name, url };
    // return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]).then((result) => result[0][0]);
    return Tweet.findOne({where: {id}, ...INCLUDE_USER })
}
export async function create(text, userId){
    // const tweet = {
    //     id:'10',
    //     text,
    //     createdAt: Date.now().toString(),
    //     userId
    // }
    // tweets = [tweet, ...tweets]
    // return getById(tweet.id);
    // return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [text, new Date(), userId]).then((result) => getById(result[0].insertId));
    return Tweet.create({ text, userId})
        .then((data) => this.getById(data.dataValues.id));
}
export async function update(id, text){
    // const tweet = tweets.find((tweet) =>tweet.id === id)
    // if (tweet){
    //     tweet.text = text
    // }
    // return getById(tweet.id);
    // return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.txt = text;
        return tweet.save();
    });
}  
export async function remove(id){
    // return db.execute('DELETE FROM tweets WHERE id=?', [id]);
    return Tweet.findByPk(id).then((tweet) => {
        tweet.destroy();
    })
}