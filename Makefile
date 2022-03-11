VAR_GIT_IGNORE_CONTENT = mongo_volume/

install :
	cd ./node_service ; npm init -y 
	cd ./node_service ; npm install --save express
	cd ./node_service ; npm install --save mongodb
	cd ./node_service ; npm install --save express-session
	cd ./node_service ; npm install --save express-handlebars
	cd ./node_service ; npm install --save mongo-express
	cd ./node_service ; npm install --save nodemon
	cd ./node_service ; npm install --save hasha
	cd ./node_service ; npm install --save uuid
	cd ./node_service ; npm install --save nodemailer
	cd ./node_service ; npm install --save jsonwebtoken
	cd ./node_service ; npm install -g npm-check-updates
	cd .node_service ; npm install --save newman
	cd ./node_service ; npm install
	- mkdir ./mongo_volume
	- mkdir ./mongo_volume/logs
	docker build -t robin/node_service:latest ./node_service
	docker-compose build
	chmod -R 777 ./mongo_volume
	touch .gitignore
	@echo \$(VAR_GIT_IGNORE_CONTENT)\ > ./.gitignore
	cd ./node_service ; ncu -u
	cd ./node_service ; ncu -g
	cd ./node_service ; npm install


develop : 

	docker-compose up -d
	cd ./node_service ; nodemon index.js localhost 3000

run :

	docker-compose up -d
	cd ./node_service ; node index.js


down:

	docker-compose down
shell :

	docker exec -it mongodb_container bash 
	


install_flask :

	cd ./flask_service ; docker build -t robin/flask_service:latest ./flask_service
	cd ./flask_service ; docker run  -d -p 5000:5000 --name flask_service  robin/flask_service

run_flask : 

	cd ./flask_service ; docker start flask_service
	

down_flask :

	cd ./flask_service ; docker stop flask_service

show:

	docker ps
	docker ps -a

flush:

	- docker-compose down
	docker images
	- docker rm mongodb_container
	- docker rmi robin/node_service
	sudo rm -R ./mongo_volume