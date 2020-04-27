<template>
  <section class="containerMain-item mainItem-boxResult">
    <button
      class="material-icons boxResult-btnClose"
      @click='clearResumeForecast'
    >clear</button>
    <p class="boxResult-locality" id="boxResult-locality">
      {{ selectedCity.LocalizedName }}, {{ selectedCity.AdministrativeArea.ID}} - {{ selectedCity.Country.LocalizedName }}
    </p>
    <p class="boxResult-localityWeather">
      {{ Math.round(resumeForecast.temperature) }}ºC
      <span>{{ resumeForecast.weatherText }}</span>
    </p>
    <div class="boxResult-weatherDetail--container">
      <div class="boxResult-weatherDetail">
        <span class="material-icons weatherDetail-arrow">arrow_downward</span>
        <p class="weatherDetail-value" >
          {{ Math.round(resumeForecast.temperatureMin.Value) }}º
        </p>
        <span class="material-icons weatherDetail-arrow">arrow_upward</span>
        <p class="weatherDetail-value">
          {{ Math.round(resumeForecast.temperatureMax.Value) }}º
        </p>
      </div>
      <p class="boxResult-weatherDetail">
        Sensação<span class="weatherDetail-value">
          {{ Math.round(resumeForecast.realFeelTemperature) }}ºC
        </span>
      </p>
      <p class="boxResult-weatherDetail">
        Vento<span class="weatherDetail-value">
          {{ Math.round(resumeForecast.windSpeed) }}km/h
        </span>
      </p>
      <p class="boxResult-weatherDetail">
        Humidade<span class="weatherDetail-value">
          {{ Math.round(resumeForecast.relativeHumidity) }}%
        </span>
      </p>
    </div>
    <hr>
    <div class="boxResult-resumeWeather">
      <p class="resumeWeather-week"
        v-for='day in resumeForecast.nextDays'
        :key='day.day'
      >
        {{ day.day.replace(/-.*/, '') }} <br>
        <span>
          {{ Math.round(day.temperatureMax.Value) }}º 
          {{ Math.round(day.temperatureMin.Value) }}º
        </span>
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LocalWeatherForecast',
  data() {
    return {}
  },
  computed: {
		...mapGetters([
      'isFetching',
      'selectedCity',
      'resumeForecast',
		]),
  },
  methods: {
    ...mapActions([
      'clearResumeForecast',
    ])
  }
}
</script>

<style scoped>
  .mainItem-boxResult{
    width: 70%;
    min-height: 200px;
    margin-bottom: 20px;
    padding: 15px 15px;
    background-color: #FFF;
    position: relative;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }
  .mainItem-boxResult p{
    color: #555;
  }
  .mainItem-boxResult hr{
    width: 100%;
    margin-top:1%;
    border:none;
    border-color: #e47404;
    border-top: 1px solid #e47404;
  }
  .boxResult-btnClose{
    position: absolute;
    top:20px;
    right: 20px;
    background-color: transparent;
    border:none;
    color:#e47404;
    font-size: 25px;
    font-weight: 700;
  }
  .boxResult-btnClose focus{
    outline: none;
  }
  .boxResult-locality{
    margin: 0 15px;
    font-weight: 800;

  }
  .boxResult-localityWeather{
    width: 90%;
    margin: 5px 15px;
    font-size: 40px;
    line-height: 40px;
    font-weight: 700;
    display: flex;
    align-items: flex-end;
  }
  .boxResult-localityWeather span {
    font-size: 2.5vmin;
    line-height: 2.5vmin;
    margin-left: 10px;
  }
  .boxResult-weatherDetail--container{
    width: 72%;
    max-width: 280px;
    margin: 0 15px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
  }
  .boxResult-weatherDetail{
    width: 45%;
    margin: 7px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    text-align: left;
    font-weight: 300;
  }
  .weatherDetail-arrow{
    font-size: 25px;
    color:#e47404;
  }
  .weatherDetail-value{
    font-weight: 700;
  }
  .boxResult-resumeWeather{
	width: 90%;
	margin: 0 15px;
	margin-top:3%;
	display: flex;
	justify-content: space-between;
	align-content: flex-start;
}
.resumeWeather-week{
	font-weight: 700;
}
.resumeWeather-week span{
	color: #e47404;
}
</style>
