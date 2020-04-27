import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import moment from 'moment';

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {
    isFetching: {
      citiesSearch: false,
      resumeForecast: false,
    },
    cities: [],
    selectedCity: null,
    resumeForecast: null,
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
    SAVE_RESUME_FORECAST: (state, info) => {
      state.resumeForecast = {
        ...state.resumeForecast,
        ...info,
      };
    },
    CLEAR_RESUME_FORECAST: (state) => {
      state.resumeForecast = null;
    }

  },
  getters: {
    isFetching: state => state.isFetching,
    cities: state => state.cities,
    selectedCity: state => state.selectedCity,
    resumeForecast: state => state.resumeForecast,
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
      dispatch('currentConditions', info.Key);
      dispatch('dailyForecast', info.Key);
    },
    clearResumeForecast: ({ commit }) => {
      commit('CLEAR_RESUME_FORECAST');
    },
    currentConditions: ({ commit }, info) => {
      const endpoint = 'http://dataservice.accuweather.com/currentconditions/v1/';
      const apikey = 'NpnEG1O1RDgXNBgAVGDmK4FkgmBQOR5H';
      commit('isFetching', {name: 'resumeForecast', value: true});
      return (
        Vue.http.get(`${endpoint}${info}?apikey=${apikey}&language=pt-br&details=true`)
        .then(response => {
          const data = response.body[0];
          const payload = {
            temperature: data.Temperature.Metric.Value,
            realFeelTemperature: data.RealFeelTemperature.Metric.Value,
            windSpeed: data.Wind.Speed.Metric.Value,
            relativeHumidity: data.RelativeHumidity,
            weatherText: data.WeatherText,
          };
          commit('isFetching', {name: 'resumeForecast', value: false});
          commit('SAVE_RESUME_FORECAST', payload);
        })
      )
    },
    dailyForecast: ({ commit }, info) => {
      const endpoint = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
      const apikey = 'NpnEG1O1RDgXNBgAVGDmK4FkgmBQOR5H';
      commit('isFetching', {name: 'resumeForecast', value: true});
      moment.locale('pt-BR');
      return (
        Vue.http.get(`${endpoint}${info}?apikey=${apikey}&language=pt-br&metric=true`)
        .then(response => {
          console.log('response: ', response);
          const data = response.body;
          const payload = {
            temperatureMin: {...data.DailyForecasts[0].Temperature.Minimum},
            temperatureMax: {...data.DailyForecasts[0].Temperature.Maximum},
            nextDays: [
              {
                day: moment(data.DailyForecasts[1].Date).format('dddd'),
                temperatureMin: {...data.DailyForecasts[1].Temperature.Minimum},
                temperatureMax: {...data.DailyForecasts[1].Temperature.Maximum},
              },
              {
                day: moment(data.DailyForecasts[2].Date).format('dddd'),
                temperatureMin: {...data.DailyForecasts[2].Temperature.Minimum},
                temperatureMax: {...data.DailyForecasts[2].Temperature.Maximum},
              },
              {
                day: moment(data.DailyForecasts[3].Date).format('dddd'),
                temperatureMin: {...data.DailyForecasts[3].Temperature.Minimum},
                temperatureMax: {...data.DailyForecasts[3].Temperature.Maximum},
              },
              {
                day: moment(data.DailyForecasts[4].Date).format('dddd'),
                temperatureMin: {...data.DailyForecasts[4].Temperature.Minimum},
                temperatureMax: {...data.DailyForecasts[4].Temperature.Maximum},
              },
            ],
          };
          commit('isFetching', {name: 'resumeForecast', value: false});
          commit('SAVE_RESUME_FORECAST', payload);
        })
      )
    }
  }
})

export { store }
