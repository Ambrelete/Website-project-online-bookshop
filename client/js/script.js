//Ici dire que pour le moment on fait du JavaScript simple côté client donc on n'utilise pas de données issues d'une bases de données comme des données issues d'un fichier JSON par exemple. Mais ils peuvent très bien récupérer les données d'une base de données avec l'API fetch en JavaScript.
const users = [{ id: 1, nom: "Lachaud", prenom: "Antoine", pseudo: "briquedelait",type_profil:"étudiant", password: "Efrei2024",
  mail: "antoine.lachaud@gmail.com", num_etudiant: "001AB"}];
const validateButton = document.getElementById("valider");

validateButton.addEventListener("click", addUser);
showAllUsers();
//Fonction à écrire et variables à créer après avoir créé la fonction showAllUsers()
updateOrDeleteUser();
function updateOrDeleteUser() {
  const deleteButtons = document.querySelectorAll(".Supprimer");
  const editButtons = document.querySelectorAll(".Modifier");

  deleteButtons.forEach((button) =>
    button.addEventListener("click", () => deleteUser(button.id))
  );
  editButtons.forEach((button) =>
    button.addEventListener("click", () => editUser(button.id))
  );
}

//Fonctionnalités
function addUser(e) {
  e.preventDefault();
  const enteredUsersData = {
    id: users.length !== 0 ? users[users.length - 1].id + 1 : 1,
    nom: document.getElementById("nom").value,
    prenom: document.getElementById("prenom").value,
    pseudo: document.getElementById("pseudo").value,
    type_profil: document.getElementById("type_profil").value,
    password: document.getElementById("password").value,
    mail: document.getElementById("mail").value,
    num_etudiant: document.getElementById("num_etudiant").value
  };
  if (
    enteredUsersData.nom !== "" &&
    enteredUsersData.prenom !== "" &&
    enteredUsersData.pseudo !== "" &&
    enteredUsersData.type_profil !== "" &&
    enteredUsersData.password !== "" &&
    enteredUsersData.mail!== "" &&
    enteredUsersData.num_etudiant !== ""
  ) {
    users.push(enteredUsersData);
    showAllUsers();
  }
}

function showAllUsers() {
  document.getElementById("allUsers").innerHTML = ""; // Pour rénitialiser le contenu de la div afin de lui attribuer de nouvelles valeurs
  users.forEach((user) => {
    const newInputs = {
      Nom: document.createElement("input"),
      Prenom: document.createElement("input"),
      Pseudo: document.createElement("input"),
      Profil: document.createElement("input"),
      Password: document.createElement("input"),
      Mail: document.createElement("input"),
      Num: document.createElement("input")

    };
    const newDiv = document.createElement("div");
    const newButtons = {
      Supprimer: document.createElement("input"),
      Modifier: document.createElement("input")
    };

    for (const [key, value] of Object.entries(newInputs)) {
      value.setAttribute("type", "text");
      //Utile pour identifier l'input afin de pouvoir modifier son contenu par la suite
      value.setAttribute("id", `${key}OfUser${user.id}`);

      key === "Nom" && value.setAttribute("value", `${user.nom}`);
      key === "Prenom" && value.setAttribute("value", `${user.prenom}`);
      key === "Pseudo" && value.setAttribute("value", `${user.pseudo}`);
      key === "Profil" && value.setAttribute("value", `${user.type_profil}`);
      key === "Password" && value.setAttribute("value", `${user.password}`);
      key === "Mail" && value.setAttribute("value", `${user.mail}`);
      key === "Num" && value.setAttribute("value", `${user.num_etudiant}`);

      newDiv.appendChild(value);
      document.getElementById("allUsers").appendChild(newDiv);
    }
    for (const [key, value] of Object.entries(newButtons)) {
      value.setAttribute("type", "button");
      value.setAttribute("class", key);
      value.setAttribute("id", user.id);
      value.setAttribute("value", key);
      newDiv.appendChild(value);
    }
  });

  updateOrDeleteUser();
}

function deleteUser(id) {
  users.forEach((user) => {
    const userPositionInArray = users.indexOf(user);
    user.id === parseInt(id) && users.splice(userPositionInArray, 1);
  });
  showAllUsers();
}

function editUser(id) {
  const newInputs = {
    nom: document.getElementById(`NomOfUser${id}`).value,
    prenom: document.getElementById(`PrenomOfUser${id}`).value,
    pseudo: document.getElementById(`PseudoOfUser${id}`).value,
    type_profil: document.getElementById(`ProfilOfUser${id}`).value,
    password: document.getElementById(`PasswordOfUser${id}`).value,
    mail: document.getElementById(`MailOfUser${id}`).value,
    num_etudiant: document.getElementById(`NumOfUser${id}`).value
  };
  users.forEach((user) => {
    if (user.id === parseInt(id)) {
      user.nom = newInputs.nom;
      user.prenom = newInputs.prenom;
      user.pseudo = newInputs.pseudo;
      user.type_profil = newInputs.type_profil;
      user.password = newInputs.password;
      user.mail = newInputs.mail;
      user.num_etudiant = newInputs.num_étudiant;
    }
  });
}
