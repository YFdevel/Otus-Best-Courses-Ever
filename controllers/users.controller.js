const usersRouter = require('express').Router();

usersRouter.post("/", (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    res.status(201).send("Пользователь успешно создан");
});

usersRouter.get("/", (req, res) => {
    res.status(200).send("Успешный запрос");
});

usersRouter.get("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Успешный запрос");
});

usersRouter.patch("/", (req, res) => {
    const {id,firstName, lastName, email, password} = req.body;
    res.status(201).send("Данные пользователя успешно изменены");
});


usersRouter.delete("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Пользователь успешно удален");
});

module.exports=usersRouter;