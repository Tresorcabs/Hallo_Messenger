## models.py pour les modèles de la base de données

from sqlalchemy import Column, Integer, String, Date, Boolean, Table, ForeignKey    ## Les types de colonnes
from datetime import datetime, timedelta     ## Pour la gestion des dates et des temps
from app import db

## La classe d'un utilisateur qui est l'utilisateur qui se connecte à l'application

class Utilisateur(db.Model):
    
    __tablename__ = 'utilisateurs'
    
    ## Données de base d'un utilisateur
    
    id = db.Column(db.Integer, primary_key=True)    
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100), nullable=False)
    date_naissance = db.Column(db.Date, nullable=False)
    genre = db.Column(db.String(10), nullable=False)
    pays = db.Column(String(50), nullable=False)
    ## biographie = Column(Text)
    
    ## Données pour la connexion
    
    numero_de_telephone = db.Column(String(20), nullable=False, unique=True)
    OTPCode = db.Column(String(10), nullable=True, unique=True)
    nom_utilisateur = db.Column(String(100), unique=True, nullable=False)
    mot_de_passe = db.Column(String(100), nullable=False)
    photo_de_profil = Column(String(250))  ## URL ou chemin vers la photo de profil
    memo = db.Column(String(120), nullable=True)
    est_certifie = db.Column(Boolean, default=False)   ## Vrai si l'utilisateur est certifié
    date_inscription = db.Column(Date, default=datetime.utcnow)   ## Date de création de l'utilisateur
    date_derniere_connexion = db.Column(db.DateTime)   ## Dernière connexion de l'utilisateur
    statut = db.Column(String(100), default="En ligne") 
    
    ## Relation inverse pour les contacts
    contacts = db.relationship('UtilisateurContact', foreign_keys='UtilisateurContact.utilisateur_id', backref='owner', lazy='dynamic')

## Model pour les contacts_data
class UtilisateurContact(db.Model):
    __tablename__ = 'utilisateur_contacts'
    id = db.Column(Integer, primary_key=True)
    utilisateur_id = db.Column(Integer, ForeignKey('utilisateurs.id'))
    contact_id = db.Column(Integer, ForeignKey('utilisateurs.id'))
    type_relation = db.Column(String(100))

    contact = db.relationship('Utilisateur', 
                            foreign_keys=[contact_id],
                            backref=db.backref('contacted_by', lazy='dynamic'))
    
    messages_non_lus = db.Column(db.Integer, default=0)

## Model pour les discussions et les messages sous forme de canaux

class Canal(db.Model):
    
    __tablename__ = 'canal'
    
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), unique=True, nullable=False)
    type_canal = db.Column(db.String(100), nullable=False)  ## "normal", "privé", "public
    id_createur = db.Column(db.Integer, db.ForeignKey('utilisateurs.id'), nullable=False)
    createur = db.relationship('Utilisateur', backref='canals_crees', lazy=True ,  foreign_keys=[id_createur])  ## relationship c'est pour la liaison entre les tables 
    membres = db.relationship('Utilisateur', secondary='participation_canal', backref='canals', lazy=True) 
    dernier_message_id = db.Column(db.Integer, db.ForeignKey('message.id'))
    dernier_message = db.relationship('Message', foreign_keys=[dernier_message_id])
    date_creation = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    date_derniere_modification = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    

class ParticipationCanal(db.Model):
    
    __tablename__ = 'participation_canal'
    
    id_canal = db.Column(db.Integer, db.ForeignKey('canal.id'), primary_key=True)
    id_utilisateur = db.Column(db.Integer, db.ForeignKey('utilisateurs.id'), primary_key=True)
    role = db.Column(db.String(100))  ## "admin", "membre"
    # dernier_message_lu_id = db.Column(db.Integer, db.ForeignKey('message.id'))
    # messages_non_lus = db.Column(db.Integer, default=0)
    

## Modèle pour les Messages

class Message(db.Model):
    
    __tablename__ = 'message'
    
    id = db.Column(db.Integer, primary_key=True)
    id_canal = db.Column(db.Integer, db.ForeignKey('canal.id'), nullable=False)
    id_expediteur = db.Column(db.Integer, db.ForeignKey('utilisateurs.id'), nullable=False)
    type_message = db.Column(db.String(100), nullable=False)  ## "texte", "image", "audio", "video", "document"
    statut = db.Column(db.String(20), default="envoyé")  # "envoyé", "reçu", "lu"
    date_envoi = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    lu = db.Column(db.Boolean, default=False)
    date_lecture = db.Column(db.DateTime)
    
    # Relation avec MessageTexte, MessageMedia, etc.
    message_texte = db.relationship('MessageTexte', backref='message', uselist=False, cascade="all, delete-orphan")
    

class MessageTexte(db.Model):
    
    __tablename__ = 'message_texte'
    
    id = db.Column(db.Integer, primary_key=True)
    id_message = db.Column(db.Integer, db.ForeignKey('message.id'), nullable=False)
    texte = db.Column(db.Text, nullable=False)

class MessageMedia(db.Model):
    
    __tablename__ = 'message_media'
    
    id = db.Column(db.Integer, primary_key=True)
    id_message = db.Column(db.Integer, db.ForeignKey('message.id'), nullable=False)
    type_media = db.Column(db.String(100), nullable=False)  ## "image", "audio", "video"
    url_media = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)

class MessageFichier(db.Model):
    
    __tablename__ = 'message_fichier'
    
    id = db.Column(db.Integer, primary_key=True)
    id_message = db.Column(db.Integer, db.ForeignKey('message.id'), nullable=False)
    type_fichier = db.Column(db.String(100), nullable=False)  ## pdf", etc
    url_fichier = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)