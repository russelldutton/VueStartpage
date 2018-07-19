<template>
    <div id="home">
        <router-link class="settings" to="/settings">
            <i class="fas fa-cog fa-2x settings-icon"></i>
        </router-link>
        <SearchBar></SearchBar>
        <IconBar></IconBar>
        <Bookmarks></Bookmarks>
    </div>
</template>

<script>
import SearchBar from './Home/SearchBar'
import IconBar from './Home/IconBar'
import Bookmarks from './Home/Bookmarks'

export default {
    name: 'Home',
    components: {
        SearchBar,
        IconBar,
        Bookmarks
    }
}
</script>

<style lang="sass">
@import ../assets/palette

.settings
    position: absolute
    z-index: 1000
    top: 10px
    right: 10px

.settings-icon
    color: $primary-color-dark
    text-decoration: none
    transition: ease transform 0.2s
    box-shadow: none

.settings-icon:hover
    transform: scale(1.5)
    box-shadow: none

</style>