# Редактор
Редактор позволяющий располагать и редактировать HTML-блоки на странице.

### Технологии
- React (собственная сборка через Webpack)
- SCSS
- Node (для серверной части)
- Nest (API)
- Postgres (для хранения данных)
- Nging (для маршрутизации по контейнерам)

### Запуск на локальном компьютере
#### Получение файлов проекта
1. Перейдите в любую папку на вашем компьютере. Например в папку пользователя: ```cd ~```
2. Скопируйте репозиторий: ```https://github.com/AndrewKozinsky/editor.git```
3. Для продолжения разработки перейдите на ветку develop ```git checkout develop```
4. Перейдите в папку editor созданного проекта: ```cd editor/editor```
5. Установите зависимости ```npm install```
6. Перейдите в папку nestApi ```cd ../nestApi/```
7. Установите зависимости ```npm install```
8. Перейдите в корень проекта: ```cd ..```
9. Проект работает в Докере. Поэтому запустите его на своём компьютере.
10. Выполните команду ```docker-compose -f docker-compose-dev.yml up --build``` для запуска проекта в Docker-compose.

#### Создание базы данных
11. Теперь нужно настроить базу данных. Откройте в Консоле другую вкладку потому что текущая будет заблокирована процессом Докера. Перейдите в контейнер с базой данных: ```docker exec -it editor-postgres sh```
12. Переключитель на пользователя postgres ```su postgres```
13. Запустите процесс psql: ```psql```
14. Выведите список баз данных: ```\l```.
15. Если там нет базы данных editor, то создайте её: ```create database editor;```
16. Выведите список пользователей: ```\du```
17. Если там нет пользователя editor, то создайте: ```create user editor with encrypted password 'dt52posQP00P';```
18. И передайте пользователя editor все привелегии: ```grant all privileges on database editor to editor;```
19. Можно выйти из контейнера дважды запустив: ```exit```

#### Наполнение базы данных
20. Перейдите в контейнер Nest-а: ```docker exec -it editor-nest sh```.
21. Можно предварительно очистить базу данных: ```node --require ts-node/register ./node_modules/typeorm/cli.js schema:drop --config=src/ormconfig.ts```. Это не обязательный шаг если база данных недавно создана.
22. Если в nestApi/src/migrations нет файлов миграции, то их можно сделать командой ```node --require ts-node/register ./node_modules/typeorm/cli.js migration:generate --config=src/ormconfig.ts -n CreateUser```.
23. Сделать миграцию чтобы наполнить базу данных необходимыми таблицами: ```node --require ts-node/register ./node_modules/typeorm/cli.js migration:run --config=src/ormconfig.ts```.
24. Можно выйти из контейнера: ```exit```

#### Запуск
25. Перезапустите проект Докера: ```docker-compose -f docker-compose-dev.yml up --build```
26. Перейдите в папку editor (если вы открыли другую вкладку Терминала, то путь будет отличаться): ```cd editor/editor```
27. Запустите: Реакт в режиме разработки ```npm run dev```
28. В браузере перейдите по адресу **http://editorium.local/editor/**.
