const request = require('supertest');
const assert = require('assert');
const  fs=require("fs");
const path=require("path");
const main=require('../index');

const html = fs.readFileSync(path.join(__dirname,"..","/views/index.mustache")).toString();
const app = main.app;

it('should return main page', function (done) {
    request(app)
        .get('/')
        .expect(html)
        .end(done);
});

it('should return NotFound with status 404', function (done) {
    request(app)
        .get('/error')
        .expect(404)
        .expect('NotFound')
        .end(done);
});

it('should return user', function (done) {
    request(app)
        .get('/users/:id')
        .expect(function (response) {
            assert.deepEqual(response.body, {
                firstName: '',
                lastName: '',
            });
        })
        .end(done);
});

afterAll(async() => {
  await main.server.close();
});