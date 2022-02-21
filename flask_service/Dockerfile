FROM python:3.9.10-bullseye

WORKDIR /.

RUN pip install flask --upgrade pip

COPY . .  

EXPOSE 5000

ENTRYPOINT ["python"]

CMD ["app.py"]