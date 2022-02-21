from flask import Flask,Blueprint,render_template,abort
from jinja2 import TemplateNotFound

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == "__main__":

    app.run(debug=True,host='0.0.0.0',port=5000)