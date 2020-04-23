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
    selectedCity: null,
    dailyForecast: null,
  },
  mutations: {
    isFetching: (state, {name, value}) => {
      state.isFetching = {
        ...state.isFetching,
        [name]: value,
      };
    },
    addCitiesSearch: (state, paylod) => {
      state.cities = paylod;
    },
    CLEAR_CITIES: (state) => {
      state.cities = [];
    },
    SAVE_SELECTED_CITY: (state, info) => {
      state.selectedCity = {
        ...info,
      };
    },
    SAVE_DAILY_FORECAST: (state, info) => {
      state.dailyForecast = {
        ...info,
      }
    }
  },
  getters: {
    isFetching: state => state.isFetching,
    cities: state => state.cities,
    selectedCity: state => state.selectedCity,
  },
  actions: {
    citiesSearch: ({ commit }, info) => {
      const endpoint = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
      const apikey = 'NpnEG1O1RDgXNBgAVGDmK4FkgmBQOR5H';
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
    },
    saveSelectedCity: ({ dispatch, commit }, info) => {
      commit('SAVE_SELECTED_CITY', info);
      dispatch('dailyForecast', info.Key);
    }, 
    dailyForecast: ({ commit }, key) => {
      const endpoint = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day';
      const apikey = 'NpnEG1O1RDgXNBgAVGDmK4FkgmBQOR5H';
      commit('isFetching', {name: 'dailyForecast', value: true});
      return (
        Vue.http.get(`${endpoint}/${key}?apikey=${apikey}&language=pt-br&metric=true`)
        .then(response => {
          console.log('response: ', response);
          commit('isFetching', {name: 'dailyForecast', value: false});
          commit('SAVE_DAILY_FORECAST', response.body);
        })
      )
    },
  }
})

export { store }
