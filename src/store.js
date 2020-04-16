import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {
    cities: []
  },
  mutations: {
    addCitiesSearch: (state, paylod) => {
      state.cities = paylod
    }
  },
  getters: {
    cities: state => state.cities,
  },
  actions: {
    citiesSearch: ({ commit }) => {
      const endpoint = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
      const apikey = 'nbM0uVQJQAsATsLBDadbN8jlVTAwE83Z';
      return (
        Vue.http.get(`${endpoint}?apikey=${apikey}&q=rio`)
        .then(response => {
          commit('addCitiesSearch', response.body);
        })
      );
    },
  }
})

export { store }