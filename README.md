###### **Проект Best Courses Ever**
Образовательная платформа с возможностью смотреть и редактировать медиа контент.
Пользователи могут редактировать и смотреть созданные курсы.
Пользователи могут создавать собственные курсы.
Курсы содержат описание и наборы занятий.
Список и описание всех курсов (а также описание занятий) доступно всем пользователям.
Также есть возможность добавлять комментарии к занятию и видеть комментарии других пользователей.
Каждое занятие может содержать описание, видео, ссылки, файлы как другой тип ресурсов.

###### **Запуск проекта**
Установить node.js на ПК
Из корневой директории проекта в терминале вызвать последовательно команды: npm i, далее - npm run start
В браузере перейти по url: https:// localhost:3001

###### **Модели данных**
_Пользователь (User):_
   - Имя (firstName),
   - Фамилия (lastName), 
   - Email (email),
   - Пароль (password),
   - Роли (roles- массив),
   - Комментарии (comments - массив)

_Курс (Course):_
   - Идентификатор автора (authorId),
   - Автор(author), 
   - Название (title),
   - Описание (description),
   - Уроки (lessons - массив)

_Урок (Lesson):_
   - Идентификатор курса (courseId),
   - Идентификатор автора (authorId),
   - Путь к медиаконтенту (videoUrl), 
   - Название (title),
   - Описание (description),
   - Комментарии (comments - массив)

######  **Основные моменты по архитектуре проекта**
Все запросы к API реализуются через соответствующий метод HTTP запроса (GET, POST, PUT, PATCH, DELETE)
Основная структура приложения находится в корневой папке:
 созданы отдельные директории для контроллеров, сервисов, моделей, мидлваров, тестов, статических файлов
Все роуты, относящиеся к API, находятся в корневой папке проекта в controllers
В проекте используется база данных - MongoDB
