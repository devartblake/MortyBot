<template>
  <div v-bar>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="scss">  
  @import './styles/index.scss'; // global css
</style>
