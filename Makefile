build :
	cd ./node_service ; npm init -y
	cd ./node_service ; npm install
	cd ./node_service ; npm i express
	cd ./node_service ; npm install --save mongodb
	cd ./node_service ; npm install --save express-session
	cd ./node_service ; npm install --save express-handlebars
	cd ./node_service ; npm install -g mongo-express
	cd ./node_service ; npm install --save nodemon
	docker build -t robin/node_service:latest ./node_service
	docker-compose build

run : 

	docker-compose up -d
	cd ./node_service ; node index.js

down:

	docker-compose down

mongo_shell :

	docker exec -it mongodb bash
# once logged inside the database shell:
# mongo -u root -p root
# type :  "help" to see the available commands
# use mongo --nodb  to activate the mongosh shell

