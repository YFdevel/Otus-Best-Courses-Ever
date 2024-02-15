import {coursesCollection, usersCollection, lessonsCollection,commentsCollection} from "../index.js";
import {ObjectId} from "mongodb";
import {FileService} from "../handlers/fileService.js"


export const create = async (body,files) => {
    const fileName1 = await FileService.saveFile(files.video);
    const fileName2 = await FileService.saveFile(files.text);
    // return await Lesson.create({...body, videoUrl: fileName});
    console.log(body)
    console.log(files)
    const {title, description, authorId, courseId} = body;
    // const lesson = await lessonsCollection.findOne({title});
    // if (lesson) {
    //     return "Урок с таким названием уже зарегистрирован";
    // }
    // const newLesson=await lessonsCollection.insertOne({
    //     title,
    //     description,
    //     authorId,
    //     courseId,
    //     videoUrl: "",
    //     pdfUrl: "",
    //     startedAt: new Date(),
    //     updatedAt: new Date(),
    //     comments: []
    // });
    // await usersCollection.findOneAndUpdate({_id: new ObjectId(authorId)},  { $push: { lessons: newLesson.insertedId } });
    // await coursesCollection.findOneAndUpdate({_id: new ObjectId(courseId)},  { $push: { lessons: newLesson.insertedId } });
    // return newLesson;
};

export const getCommentsGroupByLesson = async (id) => {
    const results=await commentsCollection.aggregate([
        { $match:{courseId:id}},
        { $group:
                { _id:'$lessonId',
                    amount: { $sum:1 },
                    info: {
                        $push: {
                            title:"$title",
                            message: "$message"
                        }
                    }
                }
        }

    ]).toArray();
    return results;
};
