git pull
docker-compose -f docker-compose-server.yml down
docker build -t editor-next ./next/Dockerfile.prod
docker-compose -f docker-compose-server.yml up