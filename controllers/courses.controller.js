const coursesRouter = require('express').Router();

coursesRouter.post("/", (req, res) => {
    const {author, title, description, authorId} = req.body;
    res.status(201).send("Курс успешно создан");
});

coursesRouter.get("/", (req, res) => {
    res.status(200).send("Успешный запрос");
});

coursesRouter.get("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Успешный запрос");
});

coursesRouter.patch("/", (req, res) => {
    const {id, title, description} = req.body;
    res.status(201).send("Данные курса успешно изменены");
});


coursesRouter.delete("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Курс успешно удален");
});

module.exports=coursesRouter;