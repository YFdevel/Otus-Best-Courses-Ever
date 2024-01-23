import {coursesCollection, usersCollection, lessonsCollection} from "../index.js";
import {ObjectId} from "mongodb";


export const create = async (body) => {
    const {title, description, authorId, courseId} = body;
    const lesson = await lessonsCollection.findOne({title});
    if (lesson) {
        return "Урок с таким названием уже зарегистрирован";
    }
    const newLesson=await lessonsCollection.insertOne({
        title,
        description,
        authorId,
        courseId,
        videoUrl: "",
        pdfUrl: "",
        startedAt: new Date(),
        updatedAt: new Date(),
        comments: []
    });
    await usersCollection.findOneAndUpdate({_id: new ObjectId(authorId)},  { $push: { lessons: newLesson.insertedId } });
    await coursesCollection.findOneAndUpdate({_id: new ObjectId(courseId)},  { $push: { lessons: newLesson.insertedId } });
    return newLesson;
};

export const getAll = async () => {
    return await lessonsCollection.find().toArray();
};

export const findById = async (id) => {
    return await lessonsCollection.findOne({_id: new ObjectId(id)});
};

export const findByAuthorId = async (id) => {
    return  await lessonsCollection.find({authorId:id}).toArray();
};

export const findByCourseId = async (id) => {
    return  await lessonsCollection.find({courseId:id}).toArray();
};

export const updateLesson = async (id,data) => {
    const lesson=await lessonsCollection.findOne({_id: new ObjectId(id)});
    return  await lessonsCollection.findOneAndUpdate({_id: new ObjectId(id)}, { $set: {...lesson,...data}});
};

export const deleteLesson = async (id) => {
    return await lessonsCollection.deleteOne({_id: new ObjectId(id)});
};

