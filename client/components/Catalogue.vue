<template>
  <div>
      <h2>Catalogue</h2>
      <div v-for="livre in livres" :key="livre.isbn">
        <div class="livre-content" v-if="editingLivre.isbn !== livre.isbn">
          <div class="livre-title">
            <h3>{{ livre.titre }} - {{ livre.auteur }}</h3>
            <div>
              <button @click="deleteLivre(livre.isbn)">Supprimer</button>
            </div>
          </div>
          <p>Éditeur : {{ livre.editeur }}</p>
          <div class="livre-img">
            <div :style="{ backgroundImage: 'url(' + livre.image + ')' }">
          </div>
          </div>
        </div>
        <div class="livre-content" v-else>
          <div class="livre-title">
            <h3><input type="text" v-model="editingLivre.titre"> - <input type="number" v-model="editingLivre.nb_exemplaire"></h3>
            <div>
              <button @click="sendEditLivre()">Valider</button>
              <button @click="abortEditLivre()">Annuler</button>
            </div>
          </div>
          <p><textarea v-model="editingLivre.editeur"></textarea></p>
          <input type="text" v-model="editingLivre.image" placeholder="Lien vers l'image">
        </div>
      </div>
  </div>
</template>

<script>
module.exports = {
props: {
    livres: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      newLivre: {
        isbn: 0,
        titre: '',
        auteur: '',
        date_publication: '',
        editeur: '',
        image: '',
        nb_exemplaire: 0
      },
      editingLivre: {
        isbn: -1,
        titre: '',
        auteur: '',
        date_publication: '',
        editeur: '',
        image: '',
        nb_exemplaire: 0
      }
    }
  },
  methods: {
    addLivre () {
      this.$emit('add-livre', this.newLivre)
    },
    deleteLivre (isbn) {
      this.$emit('delete-livre', isbn)
    },
    editLivre (livre) {
      this.editingLivre.isbn = livre.isbn
      this.editingLivre.titre = livre.titre
      this.editingLivre.auteur = livre.auteur
      this.editingLivre.date_publication = livre.date_publication
      this.editingLivre.editeur = livre.editeur
      this.editingLivre.image = livre.image
      this.editingLivre.nb_exemplaire = livre.nb_exemplaire
    },
    sendEditLivre () {
      this.$emit('update-livre', this.editingLivre)
      this.abortEditLivre()
    },
    abortEditLivre () {
      this.editingLivre = {
        isbn: -1,
        titre: '',
        auteur: '',
        date_publication: '',
        editeur: '',
        image: '',
        nb_exemplaire: 0
      }
    }
  }
}
</script>

<style scoped>
  livre {
    display: flex;
  }

  .livre-img {
    flex: 1;
  }

  .livre-img div {
    width: 200px;
    height: 200px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .livre-content {
    flex: 3;
  }

  .livre-title {
    display: flex;
    justify-content: space-between;
  }

  textarea {
    width: 100%;
  }
</style>
