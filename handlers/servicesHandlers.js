import {ObjectId} from "mongodb";
import bcrypt from "bcryptjs";

export const getAll = async (collection) => {
    return await collection.find().toArray();
};
export const findById = async (id, collection) => {
    return await collection.findOne({_id: new ObjectId(id)});
};

export const findByAuthorId = async (id,collection) => {
    return await collection.find({authorId:id}).toArray();
};

export const findByLessonId = async (id,collection) => {
    return  await collection.find({lessonId:id}).toArray();
};

export const findByCourseId = async (id,collection) => {
    return  await collection.find({courseId:id}).toArray();
};

export const updateOne = async (id,data,collection) => {
    const example=await collection.findOne({_id: new ObjectId(id)});
    if(data.password){
        data.password= await bcrypt.hashSync(data.password, 7);
    }
    await collection.findOneAndUpdate({_id: new ObjectId(id)}, { $set: {...example,...data}});
    return await findById(id,collection);
};

export const deleteOne = async (id,collection) => {
    return await collection.deleteOne({_id: new ObjectId(id)});
};

export const getLinkOfCollections =  (initial,linked) => {
    const result = initial.map((initialItem) => {
        for (const linkedItem of linked) {
            if (String(initialItem._id) === String(linkedItem._id)) {
                initialItem.comments = linkedItem.info;
            }
        }
        return initialItem;
    });
    return result;
};