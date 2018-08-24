from flask import render_template,url_for,redirect
from app import app

@app.route('/')
def landing():
    return render_template('landing.html',title ="Welcome")

@app.route('/signin')
def signin():
    return render_template('signin.html',title ="Signin")

@app.route('/signup')
def signup():
    return render_template('signup.html',title ="Signup")

@app.route('/entry')
def entry():
    return render_template('entry.html',title ="Entry")

@app.route('/home')
def home():
    return render_template('index.html',title ="Home")

@app.route('/detail/<int:entryId>')
def detail(entryId):
    return render_template('detail.html',title ="Detail")

@app.route('/modify/<int:entryId>')
def modify(entryId):
    return render_template('modify.html',title ="Modify")

@app.route('/logout')
def logout():
    return render_template('landing.html',title ="Welcome")
