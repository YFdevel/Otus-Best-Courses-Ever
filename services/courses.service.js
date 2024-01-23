import {coursesCollection, usersCollection} from "../index.js";
import {ObjectId} from "mongodb";


export const create = async (body) => {
    const {title, description, authorId} = body;
    const course = await coursesCollection.findOne({title});
    if (course) {
        return "Курс с таким названием уже зарегистрирован";
    }
    const newCourse=await coursesCollection.insertOne({
        title,
        description,
        authorId,
        duration: null,
        price: null,
        startedAt: new Date(),
        updatedAt: new Date(),
        lessons: [],
        reviews: []
    });
    await usersCollection.findOneAndUpdate({_id: new ObjectId(authorId)},  { $push: { courses: newCourse.insertedId } });
    return newCourse;
};

export const getAll = async () => {
    return await coursesCollection.find().toArray();
};

export const findById = async (id) => {
    return await coursesCollection.findOne({_id: new ObjectId(id)});
};

export const findByAuthorId = async (id) => {
    return  await coursesCollection.find({authorId:id}).toArray();
};

export const updateCourse = async (id,data) => {
    const course=await coursesCollection.findOne({_id: new ObjectId(id)});
    return  await coursesCollection.findOneAndUpdate({_id: new ObjectId(id)}, { $set: {...course,...data}});
};

export const deleteCourse = async (id) => {
    return await coursesCollection.deleteOne({_id: new ObjectId(id)});
};

