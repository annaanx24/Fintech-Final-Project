# ---- YOUR APP STARTS HERE ----
# -- Import section --
from flask import Flask
from flask import render_template
from flask import request
from datetime import datetime
import os
from flask_pymongo import PyMongo
from flask import session, url_for


# -- Initialization section --
app = Flask(__name__)


name = os.environ["name"]
pwd = os.environ["pwd"]
# name of database
app.config['MONGO_DBNAME'] = 'kidFinance'

# URI of database
app.config['MONGO_URI'] = f'mongodb+srv://{name}:{pwd}@cluster0.e8ums.mongodb.net/kidFinance?retryWrites=true&w=majority'

mongo = PyMongo(app)

# -- Routes section --
# INDEX

app.secret_key = 'yoyo'

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', time=datetime.now())

@app.route('/learn')
def learn():
    return render_template('learn.html', time=datetime.now())

@app.route('/games')
def games():
    return render_template('games.html', time=datetime.now())


# Go to signup page and add data

@app.route('/signup', methods = ["GET", "POST"])
def signup():
    if request.method == "GET":
        return render_template('signup.html', time=datetime.now())
    else: #When user submits the form

        #Store username and password as variable
        username = request.form['username']
        password = request.form['password']
        #Connect to our user database
        user = mongo.db.user
        #Do query to see if user already exists
        query = list(user.find({"name": username}))
        #Visualize the query by printing it to terminal
        print(query)
        print(len(query))
        #Check wether the user exists in our database already or not
        if len(query) > 0:
            return "User already exists" #NEEDS TO BE STYLED
        else:
            user.insert({"name": username, "password": password})
            session["name"] = username
            return "You've been added!"

@app.route('/login', methods = ["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template('login.html', time=datetime.now())
    else: #Default for when user submits the form

        #Store username and password as variable
        username = request.form['username']
        password = request.form['password']
        #Connect to our user database
        user = mongo.db.user
        #Do query to see if user already exists
        query = list(user.find({"name": username}))
        #Visualize the query by printing it to terminal
        print(query)
        print(len(query))
        #If pwd correct then set session to username
        if len(query) == 1:
            if password == query[0]["password"]:
                session["name"] = username
                print(session["name"])
                return "You've been logged in!"
        #Otherwise return an error message 
        return "invalid password and/ or username"