create :
	cd ./node_service ; npm init -y
	cd ./node_service ; npm install
	cd ./node_service ; npm i express
	cd ./node_service ; npm install --save express-session
	cd ./node_service ; npm install --save express-handlebars
	docker build -t robin/node_service:latest ./node_service

run :

	docker run -d -p 3000:3000 --name node_service robin/node_service

start : 

	docker start robin/node_service

stop : 

	docker stop robin/node_service