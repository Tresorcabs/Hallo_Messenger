## routes.py    Les routes d'accès aux ressources de l'application

from flask import jsonify, request, Blueprint  ## pour l'envoie et la reception des données en JSON
from app import db, bcrypt, socketio   ## On importe l'application depuis l'application principale 
from app.models import Utilisateur
from app.models import Canal
from app.models import ParticipationCanal
from app.models import Message, UtilisateurContact, MessageTexte
from datetime import datetime, timedelta     ## Pour la gestion des dates et des temps
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request   
import json
from sqlalchemy.orm import joinedload
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

"""

JTWManager : Gestionnaire de jetons JWT
create_access_token : Créer un jeton JWT
jwt_required : Verifier si le jeton JWT est valide
get_jwt_identity : Recherche l'utilisateur correspondant au jeton JWT

"""

## Les différents codes d'erreur avec leur réelle signification :

        # 401: Données invalides
        # 400: L'utilisateur existe déjà
        # 201: Inscription réussie
        # 200: Inscription réussie

## 

# Configuration de cloudinary 
cloudinary.config(
    cloud_name = "dl4pdx7ic",
    api_key = "437898917489615",
    api_secret = "AdtZ-oTV461AisD-OkcxmePr-j4",
    secure = True
)

routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET'])
def hello():
    return 'Hello World!'

## ! --------->  Route de l'inscription de l'Utilisateur
@routes.route('/inscription', methods=['POST'])

    
def inscription():
    data = request.get_json()    ## Ici, on reçois les données envoyées au format JSON

    # Validation des données reçues
    if not data or not 'nom' in data or not 'nom_utilisateur' in data or not 'numero_de_telephone' in data or not 'mot_de_passe' in data:
        return jsonify({'message': 'Données invalides'}), 401
    
    
    # On Crée un nouvel utilisateur
    ## On stocke les informations de l'utilisateur reçues dans des variables
    ## Avant ça, on hache le mot de passe
    
    hashed_password = bcrypt.generate_password_hash(data['mot_de_passe'], 14).decode('utf-8')
    
    
    # Stocker l'image de profil sur Cloudinary
    image = cloudinary.uploader.upload(data['photo_de_profil'], public_id=data['nom_utilisateur'], overwrite=True)
    
    photo_de_profil_url = image['secure_url']
    print(photo_de_profil_url)
    
    
    # Sérialiser la liste avant de l'insérer dans la base de données
    otp_code_serialized = json.dumps(data['OTPCode'])

    nouvel_utilisateur = Utilisateur(
    nom = data['nom'],
    prenom = data['prenom'],

    # Supprimer le 'Z' final et utiliser fromisoformat pour analyser la date
    date_naissance = datetime.fromisoformat(data['date_naissance'].replace('Z', '+00:00')),  

    genre = data['genre'],
    pays = data['pays'],
    numero_de_telephone = data['numero_de_telephone'],
    OTPCode = otp_code_serialized,
    nom_utilisateur = data['nom_utilisateur'],
    mot_de_passe = hashed_password,
    photo_de_profil = photo_de_profil_url,
    memo = data['memo'],
    est_certifie = data['est_certifie'],
    )

    # Vérifier si l'utilisateur existe déjà
    if Utilisateur.query.filter_by(nom_utilisateur=data["nom_utilisateur"]).first() is not None:
        return jsonify({'message': 'Cet utilisateur existe déjà'}), 400
    
    ## on définit la date dernière connexion de l'utilisateur
    nouvel_utilisateur.date_derniere_connexion = datetime.utcnow()
    
    # On stocke l'utilisateur dans la base de données
    
    db.session.add(nouvel_utilisateur)
    db.session.commit()    


    return jsonify({'message': "Inscription réussi"}), 201 ## envoi d'un message  et du token 

## ! --------->  Route de connexion de l'Utilisateur
@routes.route('/connexion', methods=['POST'])
def login():
    data = request.json
    
    print(data);
    
    ## On vérifie si le nom d'utilisateur et le numéro de telephone reçus sont dans la base de données
    
    nom_utilisateur = data['nom_utilisateur']
    
    numero_de_telephone = data['numero_de_telephone']
    
    # On récupère l'utilisateur correspondant au nom d'utilisateur et au numéro de telephone
    user = Utilisateur.query.filter_by(nom_utilisateur=nom_utilisateur, numero_de_telephone=numero_de_telephone).first()
    
    if not user:
        return jsonify({"message": "Utilisateur non trouvé, vérifiez vos informations "}), 404
    
    ## On compare le mot de passe envoyé avec le mot de passe hache dans la base de données et on 
    
    if bcrypt.check_password_hash(user.mot_de_passe, data['mot_de_passe']):
        access_token = create_access_token(identity=user.id)
        user.date_derniere_connexion = datetime.utcnow()
        db.session.commit()
        return jsonify(access_token=access_token), 200
    
    print(user.mot_de_passe)
    return jsonify({"message": "Login ou mot de passe incorrect"}), 401


## ! --------->  Route de déconnexion de l'Utilisateur

@routes.route('/deconnexion', methods=['POST'])
@jwt_required()
def logout():
    jti = get_raw_jwt()['jti']
    BLACKLIST.add(jti)
    return jsonify({"message": "Utilisateur déconnecté"}), 200


## ! --------->  Route pour obtenir les informations de l'utilisateur
@routes.route('/profile/', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = Utilisateur.query.get_or_404(current_user_id)
    
    if not user:
        return jsonify({"message": "Utilisateur non trouvé"}), 404
    
    if user:
        return jsonify({
            "id": user.id,
            "nom": user.nom,
            "prenom": user.prenom,
            "nom_utilisateur": user.nom_utilisateur,
            "date_naissance": user.date_naissance.strftime('%Y-%m-%d'),
            "genre": user.genre,
            "numero_de_telephone": user.numero_de_telephone,
            "mot_de_passe": user.mot_de_passe,
            "photo_de_profil": user.photo_de_profil,
            "est_certifie": user.est_certifie
        }), 200


@routes.route('/utilisateur/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = Utilisateur.query.get_or_404(user_id)
    
    if not user:
        return jsonify({"message": "Utilisateur non trouvé"}), 404
    
    if user:
        return jsonify({
            "id": user.id,
            "nom": user.nom,
            "prenom": user.prenom,
            "nom_utilisateur": user.nom_utilisateur,
            "date_naissance": user.date_naissance.strftime('%Y-%m-%d'),
            "genre": user.genre,
            "numero_de_telephone": user.numero_de_telephone,
            "mot_de_passe": user.mot_de_passe,
            "photo_de_profil": user.photo_de_profil,
            "est_certifie": user.est_certifie,
            "memo": user.memo,
        }), 200
        
# ! --------> Route pour la certification d'un compte utilisateur par la modification de la colonne est_certifié de la table Utilisateur par la méthode PATCH

@routes.route('/certifier_compte', methods=['PATCH'])
@jwt_required()
def certifier_compte():
    current_user_id = get_jwt_identity()
    print(f"User ID from JWT: {current_user_id}")  # Debug
    user = Utilisateur.query.get_or_404(current_user_id)
    
    if not user:
        return jsonify({"message": "Utilisateur non trouvé"}), 404
    
    # Modification du champ est_certifié
    user.est_certifie = True
    db.session.commit()
    
    return jsonify({"message": "Compte certifié"}), 200

# @app.route('/profile', methods=['PUT'])
# @jwt_required()
# def update_profile():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)
#     if not user:
#         return jsonify({"message": "Utilisateur non trouvé"}), 404
    
#     data = request.json
#     user.nom = data.get('nom', user.nom)
#     user.prenom = data.get('prenom', user.prenom)
#     user.biographie = data.get('biographie', user.biographie)
#     user.profile_picture = data.get('profile_picture', user.profile_picture)
    
#     db.session.commit()
#     return jsonify({"message": "Profil mis à jour avec succès"}), 200




## ! --------->  Route pour obtenir tous les contacts de la liste d'utilisateur
@routes.route('/contacts', methods=['GET'])
@jwt_required()
def get_contacts():
    try:
        current_user_id = get_jwt_identity()
        user = Utilisateur.query.get_or_404(current_user_id)
        
        contacts_data = []  # Liste pour stocker les données des contacts
        
        for contact in user.contacts:
            contact_info = {
                "id": contact.contact.id,
                "nom": contact.contact.nom,
                "prenom": contact.contact.prenom,
                "statut": contact.contact.statut,
                "photo_de_profil": contact.contact.photo_de_profil,
                "type_relation": contact.type_relation
            }
            contacts_data.append(contact_info)  # Ajoutez chaque contact à la liste
        
        if contacts_data:
            return jsonify(contacts_data), 200  # Retournez la liste complète des contacts
        
        else:
            return jsonify({"message": "Aucun contact n'est trouvé"}), 404
        
    except Exception as error: 
        print(f'Erreur : {str(error)}')
        return jsonify({"message": str(error)}), 500

## ! --------->  Route pour ajouter un nouveau contact

@routes.route('/ajouter_contact', methods=['POST'])
@jwt_required()
def add_contact():
    try:
        current_user_id = get_jwt_identity()
        user = Utilisateur.query.get_or_404(current_user_id)

        data = request.json
        contact_phone = data.get('phoneNumber')
        
        # Vérifier si le contact existe déjà dans la base de données
        contact = Utilisateur.query.filter_by(numero_de_telephone=contact_phone).first()
        
        if not contact:
            return jsonify({"message": "Ce numéro n'est pas associé à un utilisateur existant."}), 404

        # Vérifier si le contact est déjà dans la liste des contacts de l'utilisateur
        existing_contact = UtilisateurContact.query.filter_by(
            utilisateur_id=user.id, 
            contact_id=contact.id
        ).first()

        if existing_contact:
            return jsonify({"message": "Ce contact est déjà dans votre liste."}), 400

        # Ajouter le nouveau contact
        new_contact = UtilisateurContact(
            utilisateur_id=user.id,
            contact_id=contact.id,
            type_relation="normal"  # Vous pouvez ajuster cela selon vos besoins
        )

        db.session.add(new_contact)
        db.session.commit()

        return jsonify({
            "message": "Contact ajouté avec succès",
            "contact": {
                "id": contact.id,
                "nom": contact.nom,
                "prenom": contact.prenom,
                "numero_de_telephone": contact.numero_de_telephone
            }
        }), 201

    except Exception as error:
        db.session.rollback()
        print(f'Erreur : {str(error)}')
        return jsonify({"message": "Une erreur est survenue lors de l'ajout du contact"}), 500


## ! --------->  Route pour supprimer un contact

@routes.route('/contacts/<int:contact_id>', methods=['DELETE'])
@jwt_required()
def delete_contact(contact_id):
    current_user_id = get_jwt_identity()
    user = Utilisateur.query.get_or_404(current_user_id)
    
    contact = Utilisateur.query.get_or_404(contact_id)
    user.contacts.remove(contact)
    db.session.commit()
    
    return jsonify({"message": "Contact supprimé avec succès"}), 200





## ! --------->  Route pour Récupération des discussions de l'utilisateur connecté 
@routes.route('/discussions', methods=['GET'])
@jwt_required()
def get_discussions():
    current_user_id = get_jwt_identity()
    participations = ParticipationCanal.query.filter_by(id_utilisateur=current_user_id).all()

    resultats = []
    for participation in participations:
        canal = Canal.query.get(participation.id_canal)
        autre_utilisateur = next((user for user in canal.membres if user.id != current_user_id), None)
        
        if autre_utilisateur:
            
            dernier_message = canal.dernier_message
            resultats.append({
                "id": canal.id,
                "autre_utilisateur": {
                    "id": autre_utilisateur.id,
                    "nom": autre_utilisateur.nom,
                    "prenom": autre_utilisateur.prenom,
                    "photo_de_profil": autre_utilisateur.photo_de_profil,
                    "numero_de_telephone": autre_utilisateur.numero_de_telephone,
                    "statut": autre_utilisateur.statut
                },
                "utilisateur_actuel": {
                    "id": current_user_id,
                },
                "dernier_message": {
                    "id_expediteur": dernier_message.id_expediteur if dernier_message else None,
                    "contenu": dernier_message.message_texte.texte if dernier_message and dernier_message.message_texte else None,
                    "date_envoi": dernier_message.date_envoi.isoformat() if dernier_message else None,
                    "statut": dernier_message.statut if dernier_message else None
                },
            })
    return jsonify(resultats), 200

## ! --------->  Route pour Récupération pour avoir une discussion particulière
@routes.route('/discussion/<int:canal_id>', methods=['GET'])
@jwt_required()
def get_discussion(canal_id):
    current_user_id = get_jwt_identity()
    canal = Canal.query.get(canal_id)
    if canal:
        return jsonify({
            "id": canal.id,
            "autre_utilisateur": {
                "id": canal.membres[0].id if canal.membres[0].id != current_user_id else canal.membres[1].id,
                "nom": canal.membres[0].nom if canal.membres[0].id != current_user_id else canal.membres[1].nom,
                "prenom": canal.membres[0].prenom if canal.membres[0].id != current_user_id else canal.membres[1].prenom,
                "photo_de_profil": canal.membres[0].photo_de_profil if canal.membres[0].id != current_user_id else canal.membres[1].photo_de_profil,
                "numero_de_telephone": canal.membres[0].numero_de_telephone if canal.membres[0].id != current_user_id else canal.membres[1].numero_de_telephone,
                "statut": canal.membres[0].statut if canal.membres[0].id != current_user_id else canal.membres[1].statut
            },
            "utilisateur_actuel": {
                "id": current_user_id
            }
        }), 200
    else:
        return jsonify({"message": "Discussion introuvable"}), 404
    
## ! --------->  Route pour créer un nouveau canal de discussion

@routes.route('/creer_discussion', methods=['POST'])
@jwt_required()
def creer_discussion():
    current_user_id = get_jwt_identity()
    data = request.json
    autre_utilisateur_id = data.get('autre_utilisateur_id')

    # Vérifier l'existence des utilisateurs
    current_user = Utilisateur.query.get(current_user_id)
    autre_utilisateur = Utilisateur.query.get(autre_utilisateur_id)

    print(autre_utilisateur_id, current_user)
    if not current_user or not autre_utilisateur:
        return jsonify({"error": "Un des utilisateurs n'existe pas"}), 400

    # Vérifier si une discussion existe déjà
    canal_existant = Canal.query.filter(
        Canal.type_canal == 'normal',
        Canal.membres.any(id=current_user_id),  # Vérifier si l'utilisateur connecté participe à la discussion
        Canal.membres.any(id=autre_utilisateur_id)
    ).first()

    if canal_existant:
        return jsonify({"message": "Une discussion existe déjà", "canal_id": canal_existant.id}), 200

    # Créer une nouvelle discussion
    nouvelle_discussion = Canal(
        nom=f"Discussion_{current_user_id}_{autre_utilisateur_id}",
        type_canal='normal',
        id_createur=current_user_id
    )
    
    # Ajouter les utilisateurs à la discussion (membres)
    nouvelle_discussion.membres.extend([current_user, autre_utilisateur]) ##  extends() pour ajouter plusieurs objets

    # Enregistrer la nouvelle discussion dans la base de données
    db.session.add(nouvelle_discussion)
    db.session.commit()


    # Récupération du dernier message de la discussion
    dernier_message = nouvelle_discussion.dernier_message
    
    # Génération de l'id de la participation
    # participation_id = f"{current_user_id}_{autre_utilisateur_id}"
    
    # Créer une participation pour chaque utilisateur
    
    # Vérifiez si la participation existe déjà
    existing_participation1 = ParticipationCanal.query.filter_by(id_canal=nouvelle_discussion.id, id_utilisateur=current_user_id).first()
    existing_participation2 = ParticipationCanal.query.filter_by(id_canal=nouvelle_discussion.id, id_utilisateur=autre_utilisateur_id).first()

    # Ajoutez uniquement si la participation n'existe pas déjà
    if not existing_participation1:
        participation1 = ParticipationCanal(id_canal=nouvelle_discussion.id, id_utilisateur=current_user_id, role="membre")
        db.session.add(participation1)

    if not existing_participation2:
        participation2 = ParticipationCanal(id_canal=nouvelle_discussion.id, id_utilisateur=autre_utilisateur_id, role="membre")
        db.session.add(participation2)

    db.session.commit()

    return jsonify({"message": "Nouvelle discussion créée", "canal_id": nouvelle_discussion.id}), 201


## ! --------->  Routes pour les messages via WebSocket
@socketio.on('connect')
def handle_connect():
    try:
        print('Client connected')
    except Exception as e:
        print(f'Erreur lors de la connexion du client : {e}')


@socketio.on('disconnect')
def handle_disconnect():
    print('Client déconnecté')

def debug_json_serialization(data):
    """
    Fonction pour identifier quelle partie d'un dictionnaire n'est pas sérialisable en JSON.
    
    :param data: Le dictionnaire à vérifier
    :return: Un tuple (is_serializable, problematic_key, problematic_value)
    """
    try:
        json.dumps(data)
        return True, None, None
    except TypeError as e:
        for key, value in data.items():
            try:
                json.dumps({key: value})
            except TypeError:
                if isinstance(value, dict):
                    is_serializable, sub_key, sub_value = debug_json_serialization(value)
                    if not is_serializable:
                        return False, f"{key}.{sub_key}", sub_value
                return False, key, value
    return True, None, None



# ! --------->  Mise en place du chiffrement bout en bout pour les messages

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend

# Génération d'une paire de clés RSA
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend()
)

public_key = private_key.public_key()

# Sérialisation des clés
private_key_bytes = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption()
)

public_key_bytes = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)


from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

def encrypt_message(message, public_key):
    # Chiffrement du message avec la clé publique
    encrypted_message = public_key.encrypt(
        message,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return encrypted_message

def decrypt_message(encrypted_message, private_key):
    # Déchiffrement du message avec la clé privée
    decrypted_message = private_key.decrypt(
        encrypted_message,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return decrypted_message

# ! --------->  Routes pour les messages

@socketio.on('envoyer_message')
def envoyer_message(data):
    try:
        # Vérification du token JWT dans la requête
        verify_jwt_in_request()
        current_user_id = get_jwt_identity()  # Récupérer l'ID de l'utilisateur à partir du token
        
        print(f"User ID: {current_user_id}, Data: {data}")
        
        canal_id = data.get('canal_id')
        contenu = data.get('contenu')
        type_message = data.get('type_message')

        
        print(f"Envoi d'un message du user {current_user_id} au canal {canal_id}")

        # Vérification si le canal existe
        canal = Canal.query.get_or_404(canal_id)

        # Création d'un nouveau message
        nouveau_message = Message(
            id_canal=canal_id,
            id_expediteur=current_user_id,
            type_message=type_message
        )

        # Si le message est de type texte, ajouter le contenu
        if type_message == 'texte':
            message_texte = MessageTexte(texte=contenu)
            nouveau_message.message_texte = message_texte

        db.session.add(nouveau_message)
        canal.dernier_message = nouveau_message
        db.session.commit()

        message_data = {
            'id': nouveau_message.id,
            'contenu': contenu,
            'expediteur_id': current_user_id,
            'date_envoi': str(nouveau_message.date_envoi),
            'statut': str(nouveau_message.statut)  # Convertir en chaîne
        }

        # Débogage de la sérialisation JSON
        is_serializable, problematic_key, problematic_value = debug_json_serialization(message_data)
        
        if not is_serializable:
            print(f"Problème de sérialisation avec la clé: {problematic_key}")
            print(f"Valeur problématique: {problematic_value}")
            print(f"Type de la valeur problématique: {type(problematic_value)}")
            
            # Si on ne peut pas corriger, on retire la clé problématique
            del message_data[problematic_key]
        
        # Émettre le message à tous les participants du canal
        socketio.emit('nouveau_message', {
            'canal_id': canal_id,
            'message': message_data,
        }, room=f'canal_{canal_id}')
        
        # Ne pas renvoyer de réponse JSON ici, car c'est un événement Socket.IO
        return 
    
    except Exception as e:
        print(f"Erreur lors de l'envoi du message: {str(e)}")
        # Émettre une erreur via Socket.IO au lieu de renvoyer une réponse JSON
        socketio.emit('error', {'message': f"Erreur lors de l'envoi du message: {str(e)}"}, room=request.sid)

## ! --------->  Route pour obtenir les messages d'une discussion

@routes.route('/messages/<int:canal_id>', methods=['GET'])
@jwt_required()
def obtenir_messages(canal_id):
    current_user_id = get_jwt_identity()
    
    # Vérifier si l'utilisateur fait partie de la discussion
    canal = Canal.query.filter(
        Canal.id == canal_id,
        Canal.membres.any(id=current_user_id)
    ).first_or_404()

    messages = Message.query.filter_by(id_canal=canal_id).order_by(Message.date_envoi).all()

    resultats = []
    for message in messages:
        contenu = None
        if message.type_message == 'texte':
            contenu = message.message_texte.texte
        # Ajoutez d'autres types de messages si nécessaire

        resultats.append({
            "id": message.id,
            "utilisateur_actuel_id": current_user_id,
            "expediteur_id": message.id_expediteur,
            "type_message": message.type_message,
            "contenu": contenu,
            "date_envoi": message.date_envoi.isoformat(),
            "statut": message.statut
        })

    return jsonify(resultats), 200

## ! --------->  Route pour la récupération du dernier message du canal :
@routes.route('/dernier_message/<int:canal_id>', methods=['GET'])
@jwt_required()
def recuperer_dernier_message(canal_id):
    current_user_id = get_jwt_identity()
    
    # Vérifier si l'utilisateur fait partie de la discussion
    canal = Canal.query.filter(
        Canal.id == canal_id,
        Canal.membres.any(id=current_user_id)
    ).first_or_404()

    dernier_message = canal.dernier_message
    if dernier_message:
        return jsonify({
            "id": dernier_message.id,
            "contenu": dernier_message.message_texte.texte if dernier_message.type_message == 'texte' else None,
            "date_envoi": dernier_message.date_envoi.isoformat(),
            "statut": dernier_message.statut
        }), 200
    else:
        return jsonify({'message': 'Aucun message'}), 404

## ! --------->  Route pour la Mise à jour du statut d'un message :

@routes.route('/message_statut/<int:message_id>', methods=['PUT'])
@jwt_required()
def mettre_a_jour_statut_message(message_id):
    current_user_id = get_jwt_identity()
    data = request.json
    nouveau_statut = data.get('statut')

    message = Message.query.get_or_404(message_id)

    # Vérifier si l'utilisateur est le destinataire du message
    canal = Canal.query.get(message.id_canal)
    if current_user_id not in [membre.id for membre in canal.membres] or current_user_id == message.id_expediteur:
        return jsonify({"message": "Non autorisé"}), 403

    message.statut = nouveau_statut
    db.session.commit()

    return jsonify({"message": "Statut du message mis à jour"}), 200



@socketio.on('rejoindre_canal')
def rejoindre_canal(data):
    canal_id = data.get('canal_id')
    emit('nouveau_message', {'message': 'Vous avez rejoint le canal'}, room=canal_id)

@socketio.on('quitter_canal')
def quitter_canal(data):
    canal_id = data.get('canal_id')
    emit('nouveau_message', {'message': 'Vous avez quitté le canal'}, room=canal_id)