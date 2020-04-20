import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {
    isFetching: {
      citiesSearch: false,
    },
    cities: [],
  },
  mutations: {
    isFetching: (state, {name, value}) => {
      state.isFetching = {
        ...state.isFetching,
        [name]: value,
      };
    },
    addCitiesSearch: (state, paylod) => {
      state.cities = paylod
    },
    CLEAR_CITIES: (state) => {
      state.cities = []
    }
  },
  getters: {
    cities: state => state.cities,
    isFetching: state => state.isFetching,
  },
  actions: {
    citiesSearch: ({ commit }, info) => {
      const endpoint = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
      const apikey = 'nbM0uVQJQAsATsLBDadbN8jlVTAwE83Z';
      commit('isFetching', {name: 'citiesSearch', value: true});
      return (
        Vue.http.get(`${endpoint}?apikey=${apikey}&q=${info}&language=pt-br`)
        .then(response => {
          commit('isFetching', {name: 'citiesSearch', value: false});
          commit('addCitiesSearch', response.body);
        })
      );
    },
    clearCities: ({ commit }) => {
      commit('CLEAR_CITIES');
    }
  }
})

export { store }