<template>
  <div id="app">
    <TeamForm />
    <HelloWorld msg="Hello World stuff" :twoWords="number" />

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TeamForm from './team-builder/TeamForm.vue'

export default {
  name: 'app',
  data: () => ({
    greeting: 'Hello Friend',
    number: 1234,
  }),
  components: {
    HelloWorld,
    TeamForm,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
