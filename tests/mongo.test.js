import {afterAll, beforeAll, describe, it, expect} from "@jest/globals";
import {MongoClient}  from 'mongodb';

describe('MongoDB', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(globalThis.__MONGO_URI__);
        db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a user into collection', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });
});