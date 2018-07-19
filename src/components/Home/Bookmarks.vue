<template>
    <div class="content card-columns">
        <div class="card" v-for="(mark, index) in bookmarks" :key="index">
            <div class="card-body">
                <h5>{{mark.name}}</h5>
                <hr/>
                <ul>
                    <li v-for="(link, index) in mark.links" :key="index" class="bookmark-link">
                        <a :href="link.link">{{link.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Bookmarks",
  data() {
      return this.$ls.get('bookmarks')
  }
};
</script>

<style lang="sass">
@import ../../assets/palette

hr
    border-top: 1px solid $divider-color
    height: 2px

ul
    list-style-type: none
    padding: 0px
    margin: 0px

li
    height: 24px
    overflow-x: hidden

a
    text-decoration: none
    color: $secondary-text-color

a:hover
    text-decoration: none
    color: $primary-text-color


.bookmark-link
    transition: ease 0.2s transform

.bookmark-link:hover
    transform: scale(1.1)
</style>