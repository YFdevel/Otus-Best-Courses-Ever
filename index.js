const express = require('express');
const https = require("https");
const fs=require("fs");
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const coursesRouter=require("./controllers/courses.controller");
const lessonsRouter=require("./controllers/lessons.controller");
const usersRouter=require("./controllers/users.controller");
const commentsRouter=require("./controllers/comments.controller");
const reviewsRouter=require("./controllers/reviews.controller");

const PORT = 3001;
const key = fs.readFileSync('ssl/key.pem');
const cert = fs.readFileSync('ssl/cert.pem');
const app = express();
app.use(express.static('static'));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
const server = https.createServer({key: key, cert: cert }, app);


// app.use("/courses", coursesRouter);
// app.use("/users", usersRouter);
// app.use("/lessons", lessonsRouter);
// app.use("/lessons", commentsRouter);
// app.use("/lessons", reviewsRouter);

app.get('/detail', function (request, response) {
    response.render('course-detail');
});

app.get('/courses', function (request, response) {
    response.render('courses-page');
});

app.get('/', function (request, response) {
    response.render('index');
});

app.use((err, req, res, next) => {
    console.log(err?.message)
    res.status(500).send({ message: "Uh oh! An unexpected error occured." })
});

server.listen(PORT, () => { console.log('listening on 3001') });


module.exports={app,server};