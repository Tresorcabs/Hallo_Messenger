import re 

def mot_de_passe_securise(mdp):
    conditions = [
        len(mdp) >= 8,
        re.search(r'[a-z]', mdp),        # minuscule
        re.search(r'[A-Z]', mdp),        # majuscule
        re.search(r'\d', mdp),           # chiffre
        re.search(r'[^a-zA-Z0-9]', mdp)  # caractère spécial
    ]
    return sum(bool(c) for c in conditions) >= 4

mot_de_passe = input("> Entrez le mot de passe :")
mot_de_passe_securise(mot_de_passe)
print(mot_de_passe_securise(mot_de_passe))