<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './pages/Home.vue';

export default {
  name: 'App',
  components: {
    Home
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
