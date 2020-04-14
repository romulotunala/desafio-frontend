<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <WeatherForecast />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import WeatherForecast from './components/WeatherForecast.vue'

export default {
  name: 'App',
  components: {
    WeatherForecast
  }
}
</script>

<style>
#app {
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(#e47404, #fcb604);
	display: flex;
	justify-content: center;
	align-items: flex-start;
}
</style>
