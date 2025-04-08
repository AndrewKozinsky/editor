# Редактор
Редактор позволяющий располагать и редактировать HTML-блоки на странице.

### Технологии
- React (собственная сборка через Webpack)
- SCSS
- Node (для серверной части)
- Nest (API)
- Postgres (для хранения данных)
- Nginx (для маршрутизации по контейнерам)

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
10. Выполните команду ```docker-compose -f docker-compose-dev.yml up``` для запуска проекта в Docker-compose.

#### Создание базы данных
11. Теперь нужно настроить базу данных. Откройте в Консоле другую вкладку потому что текущая будет заблокирована процессом Докера. Перейдите в контейнер с базой данных: ```docker exec -it editor-postgres sh```
12. Переключитель на пользователя postgres ```su postgres```
13. Запустите процесс psql: ```psql```
14. Выведите список баз данных: ```\l```.
15. Если там нет базы данных editor, то создайте её: ```create database editor;```
16. Выведите список пользователей: ```\du```
17. Если там нет пользователя editor, то создайте: ```create user editor with encrypted password 'dt52posQP00P';```
18. И передайте пользователя editor все привелегии: ```grant all privileges on database editor to editor;```
19. Можно выйти из контейнера дважды или трижды запустив: ```exit```

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


### Обновление на сервере
Всё ниже описано в файле update.sh. Можно запустить только его и он автоматически сделает действия наже: ```sh update.sh```

**Либо эти действия можно сделать вручную.**
1. Зайдите на сервер и перейдите в папку ```cd /home/sites/editor```.
2. Обновите файлы: ```git pull```.
3. Проверьте название активной ветки: ```git branch```.
4. Если стоит не верная ветка, то перейдите в правильную. Например в develop: ```git checkout develop```.
5. Остановите запущенные контейнеры: ```docker-compose -f docker-compose-server.yml down```.
6. Запустите docker-compose по указанному файлу конфигурации: ```docker-compose -f docker-compose-server.yml up --build```

### Дамп БД editor
Самый простой способ сделать резервную копию БД через TablePlus через команду File > Backup. Там выбрать нужное подключение, базу данных и PostgreSQL 13 версии. Затем нажать Start backup и указать папку сохранения.

Для восстановления БД предварительно удалить все таблицы иначе Postgres будет жаловаться на невозможность создания множественных значений.

После восстановить БД можно через команду File > Restore. Выбрать подключение, базу данных и PostgreSQL 13 версии. Затем нажать Start restore и указать файл с дампом.

Ещё это же можно сделать из сервера.

Команда делает дамп базы данных editor. Сначала заходит в контейнер editor-postgres, потом запускает команду pg_dump.
В -U задаётся имя БД, -W требует ввода пароля после ввода команды.
В конце идёт название БД.
Далее написан путь и имя где будет сохраняться дамп
```docker exec -i editor-postgres pg_dump -U editor -W editor > /home/sites/editor/editorDBDump.sqlz```
После этой команды нужно ввести пароль от БД editor: dt52posQP00P

Для восстановления нужно предварительно удалить все таблицы из БД.

Команда восстанавливает дамп базы данных editor. Сначала заходит в контейнер editor-postgres, потом запускает команду psql.
В -U задаётся имя БД, -W требует ввода пароля. Следом указывается файл с дампом БД.
В конце идёт название БД.
Далее написан путь и имя где будет сохраняться дамп
```docker exec -i editor-postgres psql -U editor -W editor < /home/sites/editor/editorDBDump.sql```

### Полезные команды для взаимодействия с базой данных
Соединение с базой данных: ```\c editor```

Просмотр таблиц в текущей базе данных: ```\dt```

Просмотр ячеек в текущей базе данных: ```\d sites```

Для получения значений таблицы нужно использовать обычный SQL: ```SELECT * FROM sites```


### Способ получения названий классов CSS
Названия классов нужно писать не напрямую в разметке, а через объект. Подробнее написано [на GitHub](https://github.com/AndrewKozinsky/organizing-css-code) в разделе «Объект с классами».

### Настройка форм
Для создания формы нужно получить объект с конфигурацией (обычно он находится в отдельном файле), создать состояние формы через вызов useFormConstructorState(config) в который передаётся объект конфигурации и отрисовка компонента <FormConstructor /> куда передётся конфигурация и состояние. По этим данным будет отрисована форма. 
```
export default function MyComponent() {
    const formState = useFormConstructorState(config)
    return <FormConstructor config={config} state={formState} />
}
```

Объект конфигурации:

```
const config: FCType.Config = {
    fields: {
        // Название поля (для атрибута name)
        email: {
            // Тип поля
            fieldType: 'text',
            // Функция проверяющая правильность заполнения поля
            schema: (fields) => {
                return yup.string()
                    .required(commonMsg.requiredField)
                    .email(regFormMsg.emailErrInvalid)
                    .max(100, commonMsg.emailToLong)
            },
            // Различные параметры, которые нужно передать полю
            fieldData: {
                label: regFormMsg.emailField,
                autocomplete: 'username',
                placeholder: commonMsg.emailPlaceholder,
                autoFocus: true,
            }
        },
        // Далее пишутся прочие поля ...
    },
    // Настройки нижней части формы
    bottom: {
        // Параметры для кнопки отправки
        submit: {
            text: regFormMsg.submitBtnText,
            big: true,
            block: true,
            align: 'center',
            color: 'accent'
        },
    },
    // Обработчик отправки формы. В аргументе readyFieldValues находится значения полей.
    async requestFn(readyFieldValues) {
        return await regRequest(readyFieldValues)
    },
    // Функция запускаемая после отправки формы
    afterSubmit(response) {},
    // Нужно ли показывать сообщение об успешной отправке формы
    showCommonSuccess: true,
    // Текст сообщения об успешной отправке формы.
    // Если его не передать, то будет показан стандартный текст.
    commonSuccess: regFormMsg.confirmRegistrationLetter
}

export default config
```