<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="css">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

html, body {
    height: 100%;
}

button {
    cursor: pointer;
}

.bg {
    background-image: url('./assets/gradient.png');
    background-size: cover;
    background-repeat: repeat;
    background-attachment: fixed;
    background-position: center center;
    min-width: 100%;
    min-height: 100%;
    height: auto;
}

.content {
  padding-top: 1%;
  /* margin-bottom: 5%; */
  margin-left: 15%;
  margin-right: 15%;
}


.card {
    border-radius: 0px !important;
    box-shadow: 0px 8px 2px -2px rgba(5, 5, 5, 0.2) !important;
}

.card-body {
    padding: 15px;
}

.card-columns {
    column-count: 4 !important;
}

</style>
