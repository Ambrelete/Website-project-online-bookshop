const express = require('express')
const app = require('../app.js')
const router = express.Router()
const mysql = require('mysql');
const { json } = require('express/lib/response');


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8cD-DrEaMM.5523",
  database: "dbProjet"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL !"); //prout
})

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}

/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

/**
 * Notre mécanisme de sauvegarde des paniers de l'étudiant sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/**
 * Renvoie l'intégralité des livres du site
 */
router.get('/livres', (req, res) => {
  db.query("SELECT * FROM livre", function(err, result) {
    if(err) throw err
    res.json(result)
  });
})
 

// Ajouter un livre à la BD
router.post('/livre', (req, res) => {
  const isbn = req.body.isbn
  const titre = req.body.titre
  const auteur = req.body.auteur
  const date_publication = req.body.date_publication
  const editeur = req.body.editeur
  const image = req.body.image
  const nb_exemplaire = parseInt(req.body.nb_exemplaire)

  // vérification de la validité des données entrées
  if (typeof titre !== 'string' || titre === '' ||
      typeof auteur !== 'string' || auteur === '' ||
      typeof image !== 'string' || image === '' ||
      typeof date_publication !== 'string' || date_publication === '' ||
      typeof editeur !== 'string' || editeur === '' ||
      isNaN(nb_exemplaire) || nb_exemplaire <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const livre = {
    isbn: isbn,
    titre: titre,
    auteur: auteur,
    editeur: editeur,
    date_publication: date_publication,
    image: image,
    nb_exemplaire: nb_exemplaire
  }

  var sql = "INSERT INTO livre (isbn, titre, auteur, editeur, date_publication, nb_exemplaire, image) VALUES ?";
  var value = [[livre.isbn, livre.titre, livre.auteur, livre.editeur, livre.date_publication, livre.nb_exemplaire, livre.image]];

  db.query(sql, [value], function(err, result) {
    if (err) throw err;
    res.json(livre)
  });
})

//Supprime un livre de la DB
router.delete('/livre/:isbn', (req, res) => {
  const isbn = req.params.isbn
  res.json(isbn)
  if (isNaN(isbn) || isbn <= 0 ){
    res.status(400).json({ message: 'bad request' })
    return
  }

  var sql = 'DELETE FROM livre WHERE isbn = ' + isbn

  db.query(sql)
})

//Met à jour le nombre d'exemplaire d'un livre
router.put('/livre/:isbn', (req, res) => {
  const isbn = req.params.isbn //ISBN du livre à update
  const nb_exemplaire_needed = parseInt(req.body.nb_exemplaire_needed) //NB EXEMPLAIRE VOULUS
  var nb_exemplaire //Nb exemplaire de base récupérés par la requête ci-dessous

  var sql = 'SELECT nb_exemplaire FROM livre WHERE isbn = ' + isbn //On récupère le nombre d'exemplaire actuel d'un livre de la BD
  db.query(sql, function(err, rows, fields) {
    if(err) throw err
    var nb_exemplaire = rows[0].nb_exemplaire
    console.log(nb_exemplaire)

    var new_nb_ex = nb_exemplaire - nb_exemplaire_needed
    if(new_nb_ex < 0) {
      res.status(400).json({ message: 'Trop d exemplaire demandés' })
      return
    }

    sql = 'UPDATE livre SET nb_exemplaire = ' + new_nb_ex + ' WHERE isbn = ' + isbn
    db.query(sql, function(err, result) {
      if(err) throw err
      res.json({ new_nb_exemplaire: new_nb_ex })
    })
  })
})

/* Retourne les utilisateurs inscrits sur le site (admins et membres) */
router.get('/users', (req, res) => {
  db.query('SELECT * FROM user', function(err, result) {
    if(err) throw err
    res.json(result)
  })
})

//À MODIFIER
router.get('/login', (req, res) => {
  db.query("UPDATE users SET actif = true WHERE (password LIKE '" + password + "') AND (email LIKE '" + mail + "')", function(err, result, fields) {
    if(err) throw err
    db.query("SELECT * FROM users WHERE (password LIKE '" + password + "' AND email LIKE '%" + mail + "%')", function(err, result, fields) {
      if(err) throw err
      res.json(result)
      req.session.userID = result.id
      if(result.id != null) {
        return true
      }
    });
  return false
});
})

/*
 * Cette route doit retourner le panier de l'étudiant, grâce à req.session
 */
router.get('/panier', (req, res) => {
  res.json(req.session.panier)
})

/*
 * Ajoute un livre au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id du livre, ainsi que le nombre d'exemplaire voulue
 */
/*-------------MODIFIE-------------------------------------------------------------------------------------*/
router.post('/panier', (req, res) => {
    const isbn = parseInt(req.body.isbn)
    const nb_exemplaire = parseInt(req.body.nb_exemplaire)
    const livre = {isbn, nb_exemplaire}
    var trouve=false
   

    if(id_exemplaire < 0) 
      res.status(400).json({message : "Quantité de livres saisie est négative"})

    livres.forEach(livre => {
      if (livre.isbn === isbn)
        trouve=true
    })

    if(!trouve)
      res.status(404).json({message : "Le livre ne fait pas partie de la bibliothèque"})

    var panier=false;

    req.session.panier.livres.forEach(livre => {
      if (livre.isbn===isbn_saisie)
        panier=true
    })

    if(panier) {
      res.status(400).json({message : "Le livre existe déjà dans le panier"})
    }

    req.session.panier.livres.push({
      isbn: parseInt(req.body.isbn),
      nb_exemplaire: parseInt(req.body.nb_exemplaire)
    })

    res.json(req.session.panier.livres)
})

/*
 * Permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  const prenom = req.body.prenom
  const nom = req.body.nom

  req.session.destroy()

  res.json({message : "Merci " + prenom + " " + nom + " pour votre emprunt."})
})

/*
 * Permettre de changer la quantité d'un livre dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:isbn', (req, res) => {
  const isbn = parseInt(req.body.isbn)
  const nb_exemplaire = parseInt(req.body.nb_exemplaire)
  const livresPanier = req.session.panier.livres
  const livre = {id, nb_exemplaire}

  if(nb_exemplaire < 0) 
    res.status(400).json({message : "Nb exemplaire de livre saisie négative"})

  var trouve=false

  livressPanier.forEach(livre => {
    if (livre.isbn === isbn) {
      trouve=true
      livre.nb_exemplaire = nb_ex_saisie
    }
  })

  if(!trouve)
    res.status(404).json({message : " Le livre n'est pas dans le panier."})

  res.json(livresPanier)
})

/*
 * Supprime un livre dans le panier
 */
router.delete('/panier/:isbn', (req, res) => {
  const isbn_saisie = parseInt(req.body.isbn)
  const livresPanier = req.session.panier.livres

  var trouve=false

  livresPanier.forEach(livre => {
    if (livre.isbn === isbn) {
      trouve=true
      const index = livresPanier.findIndex(a => a.isbn === isbn)

      livresPanier.splice(index, 1) // supprime le livre du panier

      return res.send()
    }
  })

  if(!trouve)
    res.status(404).json({message : "Le livre n'est pas dans le panier."})
})

module.exports = router
