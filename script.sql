USE dbProjet;

-- type_profil désigne MEMBRE ou ADMIN afin de séparer les fonctionnalités entre membres et admins

CREATE TABLE user (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  type_profil VARCHAR(10) NOT NULL,
  pseudo VARCHAR(50) NOT NULL,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  mail VARCHAR(50) NOT NULL,
  num_etudiant VARCHAR(15) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE livre (
  isbn INT UNSIGNED NOT NULL,
  titre VARCHAR(50) NOT NULL,
  auteur VARCHAR(50) NOT NULL,
  date_publication DATE NOT NULL,
  editeur VARCHAR(50) NOT NULL,
  image VARCHAR(250),
  nb_exemplaire INT UNSIGNED,
  PRIMARY KEY (isbn)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE panier (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- La première FOREIGN KEY permet de link le panier_item au livre
-- La seconde FOREIGN KEY permet de link le panier_item à l'utilisateur afin de retrouver tous les panier_item liés à un utilisateur
CREATE TABLE panier_item (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  livre_isbn INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  nb_ex_empruntes INT,
  FOREIGN KEY (livre_isbn) REFERENCES livre(isbn),
  FOREIGN KEY (user_id) REFERENCES user(id),
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


DROP TABLE panier_item;
DROP TABLE panier;
DROP TABLE livre;
DROP TABLE user;