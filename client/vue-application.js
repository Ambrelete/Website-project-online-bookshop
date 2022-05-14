const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Catalogue = window.httpVueLoader('./components/Catalogue.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
  { path: '/catalogue', component: Catalogue },
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    livres: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      livres: []
    },
    user: {},
    isConnected: false
  },
  async mounted () {
    const res = await axios.get('/api/livres')
    this.livres = res.data

    /**  À MODIFIER, OU SUPPRIMER, OU JSP**/
    // try {
    //   const res3 = await axios.get('/api/me')
    //   this.user = res3.data
    //   this.isConnected = true
    // } catch (err) {
    //   // if (err.response && err.response.statusCode === 401) {
    //   if (err.response?.status === 401) {
    //     this.isConnected = false
    //   } else {
    //     console.log('error', err)
    //   }
    // }
  },
  methods: {
    async addLivre (livre) {
      const res = await axios.post('/api/livre', livre)
      this.livres.push(res.data)
    },
    async updateLivre (newLivre) {
      await axios.put('/api/livre/' + newLivre.isbn, newLivre)
      const livre = this.livres.find(a => a.isbn === newLivre.isbn)

      livre.isbn =   newLivre.isbn
      livre.titre =  newLivre.titre
      livre.auteur = newLivre.auteur
      livre.date_publication = newLivre.date_publication
      livre.editeur = newLivre.editeur
      livre.image = newLivre.image
      livre.nb_exemplaire = newLivre.nb_exemplaire
    },
    async deleteLivre (isbn) {
      await axios.delete('/api/livre/' + isbn)
      const index = this.livres.findIndex(a => a.isbn === isbn)
      this.livres.splice(index, 1)
    },
    async pay () {
      await axios.post('/api/pay')
      this.panier.livres = []
    },
    async login (user) {
      const res = await axios.post('/api/login', user)
      this.user = res.data
      this.isConnected = true
      this.$router.push('/')
    }
  }
})
