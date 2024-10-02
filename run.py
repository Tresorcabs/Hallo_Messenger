## run.py

## Initialisation de l'application Flask

from flask import Flask, request, jsonify     ## Pour les requêtes HTTP
from datetime import datetime, timedelta     ## Pour la gestion des dates et des temps
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from app import app, db, socketio
from app.models import Utilisateur, UtilisateurContact
from flask_cors import CORS
from eventlet import wsgi
import eventlet

with app.app_context():
    
    try:
        db.create_all()
        
        db.session.commit()
        # ## Quelques users pour tester
        
        # users_data = [
        #     {
        #         'nom': 'John',
        #         'prenom': 'Doe',
        #         'date_naissance': '2000-01-01',
        #         'genre': 'Homme',
        #         'numero_de_telephone': '1234567890',
        #         'nom_utilisateur': 'john_doe',
        #         'mot_de_passe': 'password123',
        #         'photo_de_profil': 'https://example.com/john_doe.jpg',
        #         'est_certifie': False,
        #         'date_inscription': datetime.utcnow(),
        #         'date_derniere_connexion': None
        #     },
        #     {
        #         'nom': 'Jane',
        #         'prenom': 'Doe',
        #         'date_naissance': '2000-01-01',
        #         'genre': 'Femme',
        #         'numero_de_telephone': '1234567845',
        #         'nom_utilisateur': 'jane_doe',
        #         'mot_de_passe': 'password123',
        #         'photo_de_profil': 'https://example.com/jane_doe.jpg',
        #         'est_certifie': False,
        #         'date_inscription': datetime.utcnow(),
        #         'date_derniere_connexion': None
        #     }
        # ]

        # for user_data in users_data:
        #     user_data['date_naissance'] = datetime.strptime(user_data['date_naissance'], '%Y-%m-%d')
        #     db.session.add(Utilisateur(**user_data))   ## **user_data permet de passer les informations au format dictionnaire

        # db.session.commit()
        
        
        # ## Récupération et affichage des users
        
        # users = Utilisateur.query.all()
        
        # for user in users:
        #     print(user.nom)
        
        

    except Exception as e:
        print(e)

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000, debug=True)
    
    # Utilisation de eventlet pour les WebSockets
    socketio.run(app, host='192.168.223.150', port=5000, debug=True)
    CORS(app)