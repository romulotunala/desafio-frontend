<template>
  <section class="search">
    <div
      class="search__inputGroup"
    >
      <input  class="inputGroup__input"
        type="text"
        id="city"
        placeholder="Insira aqui o nome da cidade"
        v-model="city.LocalizedName"
        autocomplete="off"
        @change='handleCity'
      >
      <button
        class="inputGroup__icon"
        type="button"
        @click="handleCity"
      >
        <img :src="require('../../public/assets/search_darkGray.svg')" alt="search icon"/>
      </button>
    </div>
    <ul class="search__dropdownContent"
      v-if="isFetching.citiesSearch"
    >
      <li class="dropdownContent__item">Buscando</li>
    </ul>
    <ul class="search__dropdownContent"
      v-else-if="cities.length > 0"
    >
      <li class="dropdownContent__item"
        v-for="city in cities"
        :key='city.Key'
        @click='selectCity(city)'
      >
        {{ city.LocalizedName }}, {{ city.AdministrativeArea.LocalizedName }}, {{ city.Country.ID }}
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      city: {
        LocalizedName: ''
      }
    }
  },
  computed: {
		...mapGetters([
      'isFetching',
      'cities',
      'selectedCity',
		]), 
	},
	methods: {
		...mapActions([
      'citiesSearch',
      'clearCities',
      'saveSelectedCity',
    ]),
    handleCity(ev) {
      const { value } = ev.target;
      if(value) {
        this.city = {
          LocalizedName: value.trim()
        };
      }
      this.citiesSearch(this.city.LocalizedName);
    },
    selectCity(city) {
      this.city = city;
      this.clearCities();
      this.saveSelectedCity(city);
    },
	},

}
</script>
<style scoped>
  .search{
    position: relative;
    width: 100%;
    height:40px;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: flex-start;	
  }
  .search__inputGroup{
    width: 70%;
    height: 100%;
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee;
  }
  .inputGroup__input{
    width: 85%;
    height: 100%;
    padding: 20px;
    padding-right: 0;
    border:none;
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
  }
  .inputGroup__input:focus{
    outline: none;
  }
  .inputGroup__icon{
    width: 30px;
    height: 100%;
    margin: 0 20px;
    background:transparent;
    border:none;
    cursor: pointer;
  }
  .inputGroup__icon img {
    width: 100%;
  }
  .inputGroup__icon:focus{
    outline: none;
  }
  .search__dropdownContent {
    width: 70%;
    max-height: 250px;
    overflow-x: auto;
    background-color: #FFF;
    position: absolute;
    top: 100%;
    list-style: none;
  }
  .dropdownContent__item {
    padding: 5px 20px;
  }
  .dropdownContent__item:hover {
    background: #eee;
  }
</style>
