# Загрузка новой версии файлов
git pull

# Сборка образов сервисов
#docker build -t editor-editor -f ./editor/Dockerfile.prod ./editor
#docker build -t editor-nest -f ./nest/Dockerfile.prod ./nest
#docker build -t editor-next -f ./next/Dockerfile.prod ./next

# Остановка всех контейнеров
docker-compose -f docker-compose-server.yml down

# Запуск контейнеров из собранных образов
docker-compose -f docker-compose-server.yml up --build