docker-compose -f docker-compose-server.yml down
git pull
docker-compose -f docker-compose-server.yml up --build