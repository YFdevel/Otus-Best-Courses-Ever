import bcrypt from "bcryptjs";
import {roles} from "../sources/roles.js";
import {usersCollection} from "../index.js";
import {ObjectId} from "mongodb";


export const create = async (body) => {
    const {firstName, lastName, email, password} = body;
    const user = await usersCollection.findOne({email});
    if (user) {
        return "Пользователь с таким email уже зарегистрирован";
    }
    const hashPassword = bcrypt.hashSync(password, 7);
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

export const getAll = async () => {
    return await usersCollection.find().toArray();
};

export const findById = async (id) => {
    return await usersCollection.findOne({_id: new ObjectId(id)});
};

export const updateUser = async (id,data) => {
    const user=await usersCollection.findOne({_id: new ObjectId(id)});
    return  await usersCollection.findOneAndUpdate({_id: new ObjectId(id)}, { $set: {...user,...data}});
};

export const deleteUser = async (id) => {
    return await usersCollection.deleteOne({_id: new ObjectId(id)});
};

