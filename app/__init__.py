## __init__.py

## Initialisation de l'application Flask

from datetime import datetime, timedelta     ## Pour la gestion des dates et des temps
import os
from flask import Flask
from sqlalchemy.orm import declarative_base  ## Pour la base de données
from flask_sqlalchemy import SQLAlchemy      ## Pour la base de données 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt               ## Pour le cryptage des mots de passe
from flask_socketio import SocketIO, emit
from flask_migrate import Migrate

app = Flask(__name__)

app.config["SECRET_KEY"] = "T3mp0-S3cr3t-K3Y"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hallo_local.db'       ## Configuration de la base de données SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False                     ## Pour ne pas afficher les modifications dans la console de Flask
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'T3mp0-S3cr3t-K3Y')   ## Ici, on utilise une vraie clé secrète
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)               ## Ici, on indique qu'un jeton JWT expire dans 1 jour



## Initialisation de la base de données
## Déclaration de la base 

Base = declarative_base()

db = SQLAlchemy(model_class=Base)  ## Initialisation de la base avec la classe principale 


bcrypt = Bcrypt(app)        ## Initialisation du cryptage des mots de passe
jwt = JWTManager(app)         ## Initialisation du gestionnaire de jetons JWT


db.init_app(app)
bcrypt.init_app(app)

migrate = Migrate(app, db)

socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet') # Utiliser eventlet comme mode asynchrone

from app.routes import routes as routes_blueprint # Ceci importe les routes pour les rendre accessibles

app.register_blueprint(routes_blueprint)