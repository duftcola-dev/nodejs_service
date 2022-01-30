build :
	cd ./node_service ; npm init -y
	cd ./node_service ; npm install
	cd ./node_service ; npm i express
	cd ./node_service ; npm install --save express-session
	cd ./node_service ; npm install --save express-handlebars
	docker build -t robin/node_service:latest ./node_service
	docker-compose build

run : 

	docker-compose up -d

mongo_shell :

	docker exec -it mongo bash
	mongo -u root -p root
	help

