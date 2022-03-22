# Загрузка новой версии файлов
git pull

# Сборка образов сервисов
docker build -t editor-editor:latest -f ./editor/Dockerfile.prod ./editor
docker build -t editor-nest:latest -f ./nest/Dockerfile.prod ./nest
docker build -t editor-next:latest -f ./next/Dockerfile.prod ./next

# Остановка всех контейнеров
docker-compose -f docker-compose-server.yml down

# Запуск контейнеров из собранных образов
docker-compose -f docker-compose-server.yml up --build