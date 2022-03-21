# Загрузка новой версии файлов
git pull

# Сборка образов сервисов
docker build -t editor-editor:latest -f ./editor/Dockerfile.prod
docker build -t editor-nest:latest -f ./nest/Dockerfile.prod
docker build -t editor-next:latest -f ./next/Dockerfile.prod

# Остановка всех контейнеров
docker-compose -f docker-compose-server.yml down

# Запуск контейнеров из собранных образов
docker-compose -f docker-compose-server.yml up