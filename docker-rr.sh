CONTAINER_ID="$(docker ps | grep "catto-bonk" | cut -d " " -f 1)"
docker kill $CONTAINER_ID
docker rm $CONTAINER_ID

IMAGE_ID="$(docker images | grep "catto-bonk" | xargs | cut -d " " -f 3 | xargs)"
docker rmi $IMAGE_ID

docker build . -t catto-bonk
docker run -d -p2222:8080 --name "catto-bonk" --restart unless-stopped catto-bonk