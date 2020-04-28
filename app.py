#from myproject import app,db
from flask import render_template, redirect, request, url_for, flash,abort
from models import yt_to_audio
from models import ambisonic, bassboost, karaoke
from models.spleeter import spleeterfun
#from flask_login import login_user,login_required,logout_user
#from myproject.models import User
#from myproject.forms import LoginForm, RegistrationForm
#from werkzeug.security import generate_password_hash, check_password_hash

import os
from flask import Flask
#from flask_sqlalchemy import SQLAlchemy
#from flask_migrate import Migrate
#from flask_login import LoginManager


app = Flask(__name__)
title=''
status='new'

a = 0
b = 0
c = 0
@app.route('/')
def home():
    global a
    a=0
    global b
    b=0
    global c
    c=0
    print(a,b,c)
    return render_template('index.html',errormsg="")
   

# @app.route('/about')
# def info():
#     return render_template('index.html')

@app.route('/components',methods=['POST'])
def component():
    global a
    global title
    # title=''
    val=request.form['ytlink']
    try:
        title=yt_to_audio.yt2audio(val)
    except:
        return render_template('index.html',errormsg="Please enter a valid Youtube link")
    return render_template('options.html', title=title)

# @app.route('/player',methods=['GET'])
# def player():
#     return render_template('player.html', title=title)

@app.route('/ambisonic',methods=['POST'])
def ambisonic_sound():
    global b
    if(b==0):
        ambisonic.to_ambisonic()
        b=1
    global title
    return render_template('player.html', filetype='ambisonic',title=title)

@app.route('/split',methods=['POST'])
def split_sound():
    global a
    if(a==0):
        spleeterfun.split_it()
        karaoke.karaoke()
        a=1
    global title
    return render_template('exp.html', filetype='split', title=title)

@app.route('/karaoke',methods=['POST'])
def karaoke_sound():
    global a
    if(a==0):
        spleeterfun.split_it()
        karaoke.karaoke()
        a=1
    global title
    return render_template('exp.html', filetype='karaoke',title=title)

@app.route('/bassboost',methods=['POST'])
def bassboost_sound():
    global c
    if(c==0):
        bassboost.boostbass()
        c=1
    global title
    return render_template('player.html', filetype='bassboosted',title=title)

if __name__ == '__main__':
    app.run(debug=True)
