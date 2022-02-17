install :

	docker build -t robin/flask_service:latest ./flask_service
	docker run  -d -p 5000:5000 --name flask_service  robin/flask_service

run : 

	docker start flask_service
	

down :

	docker stop flask_service