import bcrypt from "bcryptjs";
import {roles} from "../sources/roles.js";
import {usersCollection} from "../index.js";
import {ObjectId} from "mongodb";


export const create = async (body) => {
    console.log("service")
    console.log(body)
    const {firstName, lastName, email, password} = body;
    const user = await usersCollection.findOne({email});
    if (user) {
        return "Пользователь с таким email уже зарегистрирован";
    }
    // const hashPassword = bcrypt.hashSync(password, 7);
    const hashPassword = password;
    return await usersCollection.insertOne({
        firstName,
        lastName,
        age: null,
        avatar: "",
        isBanned: false,
        registerAt: new Date(),
        email,
        password: hashPassword,
        roles: [roles.USER],
        courses:[],
        lessons:[],
        comments: [],
        reviews: []
    });
};

