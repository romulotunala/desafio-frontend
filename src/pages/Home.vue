<template>
  <div class="body">
    <header class="headerHome">
      <h1 class="headerHome-title" id="hearderTitle">Previsão do tempo</h1>
    </header>
    <main class="containerMain">
      <section class="containerMain-item mainItem-boxResult" id="boxResult" style="display: none;">
        <button class="boxResult-btnClose" onclick="showBoxResult()">X</button>
        <p class="boxResult-locality" id="boxResult-locality">Rio de Janeiro, RJ - Brasil</p>
        <p class="boxResult-localityWeather" id="boxResult-localityWeather">20ºC Nublado</p>
        <div class="boxResult-weatherDetail--container">
          <div class="boxResult-weatherDetail">
            <i class="material-icons weatherDetail-arrow">arrow_downward</i>
            <p class="weatherDetail-value" id="weatherDetail-value--high">16º</p>
            <i class="material-icons weatherDetail-arrow">arrow_upward</i>
            <p class="weatherDetail-value" id="weatherDetail-value--low">25º</p>
          </div>
          <p class="boxResult-weatherDetail">Sensação<span class="weatherDetail-value" id="weatherDetail-value--chill">19ºC</span></p>
          <p class="boxResult-weatherDetail">Vento<span class="weatherDetail-value" id="weatherDetail-value--wind">18km/h</span></p>
          <p class="boxResult-weatherDetail">Humidade<span class="weatherDetail-value" id="weatherDetail-value--humidity">19ºC</span></p>
        </div>
        <hr>
        <div class="boxResult-resumeWeather" id="boxResult-resumeWeather">
          <p class="resumeWeather-week">
            Terça <br>
            <span>18º 26º</span>
          </p>
          <p class="resumeWeather-week" id="resumeWeather-week">
            Quarta <br>
            <span>18º 28º</span>
          </p>
          <p class="resumeWeather-week" id="resumeWeather-week">
            Quinta <br>
            <span>19º 30º</span>
          </p>
          <p class="resumeWeather-week" id="resumeWeather-week">
            Sexta <br>
            <span>18º 26º</span>
          </p>
          <p class="resumeWeather-week" id="resumeWeather-week">
            Sábado <br>
            <span>18º 26º</span>
          </p>
        </div>
      </section>
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
import Search from '../components/Search';

export default {
	name: 'Home', 
	components: {
		Search
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
	/*background-color:none;*/
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
	margin: 0 15px;
	font-size: 40px;
	font-weight: 700;
}
.boxResult-weatherDetail--container{
	width: 72%;
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