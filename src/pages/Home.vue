<template>
  <div class="body">
    <header class="headerHome">
      <h1 class="headerHome-title" id="hearderTitle">Previsão do tempo</h1>
    </header>
    <main class="containerMain">
      <LocalWeatherForecast v-if='resumeForecast && !isFetching.resumeForecast' />
			<img class=containerMain__loadingIcon
				v-if='isFetching.resumeForecast'
				:src="require('../../public/assets/loader-white.svg')"
				alt="Loading"
			/>
      <Search />
      <hr>
      <!-- <section class="containerMain-item metropolis">		
        <h2 class="metropolis-title">Capitais</h2>
				<p v-for="city in cities" :key='city.name'>{{ city.name }}</p>
        <table class="metropolis-weather">
          <thead class="metropolisWeather-head" id="metropolis-head--1">
          </thead>
          <tbody class="metropolisWeather-body" id="metropolis-body--1">
          </tbody>
        </table>
        <table class="metropolis-weather">
          <thead class="metropolisWeather-head" id="metropolis-head--2">
          </thead>
          <tbody class="metropolisWeather-body" id="metropolis-body--2">
          </tbody>
        </table>
      </section> -->
    </main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

// Components
import Search from '../components/Search';
import LocalWeatherForecast from '../components/LocalWeatherForecast';

export default {
	name: 'Home', 
	components: {
		Search,
		LocalWeatherForecast,
	},
  computed: {
		...mapGetters([
      'isFetching',
      'resumeForecast',
		]),
	},
}
</script>
<style scoped>
/*#fcb604 - amarelo fundo*/
/*#e47404 - laranjado fundo*/
/*#2b2922 - cinza*/
.body{
	width: 50%;
	min-width: 600px;
	max-width: 1000px;
	height: 100%;
	font-family: 'Open Sans', sans-serif;
	font-weight: 400;
}
hr{
	width: 100%;
	margin-top: 7%;
}
.headerHome{
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
}
.headerHome-title{
	margin: 7% auto;
	color: #FFF;
	font-weight: 700;
	font-size: 60px;
}
.containerMain{
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
}

.containerMain__loadingIcon{
	width: 50px;
	margin-bottom: 30px;
}

.metropolis{
	width: 60%;
	height: auto;
	min-height: 10px;
	max-height:300px;
	/*padding-top: 2%;*/
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10px;
}
.metropolis-title{
	width: 100%;
	color: #FFF;
	font-family: 'Open Sans', sans-serif;
	font-weight: 700;
	font-size: 35px;
	line-height: 2em;
}
.metropolis-weather{
	min-width: 48%;
	max-height: 200px;

}
/* .metropolisWeather-head{
	background-color: blue;
}
.metropolisWeather-head__tr{

} */
.head__tr-item{
	font-family: 'Open Sans', sans-serif;
	font-weight: 400;
	font-size: 12px;	
	color: #2b2922;
	text-align: left;
}
.metropolisWeather-body{
	max-width: 100%;
}
/* .metropolisWeather-body__tr{

} */
.body__tr-item{
	font-family: 'Open Sans', sans-serif;
	font-weight: 700;
	font-size: 15px;
	color: #2b2922;
	line-height: 2em;
}
</style>
