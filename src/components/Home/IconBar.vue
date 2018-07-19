<template>
    <div class="content">
        <div class="container px-0">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-around">
                        <a v-for="(icon, id) in iconbar" :key="id" :href="icon.link">
                            <i :class="icon.icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IconBar',
    data() {
        return this.$ls.get('iconbar')
    }

}
</script>

<style lang="sass">
@import ../../assets/palette

i
    color: $primary-color
    text-decoration: none

i:hover
    color: $primary-color
    text-decoration: none

a
    transition: ease 0.2s transform
    color: $primary-color

a:hover
    transform: scale(1.2)
    color: $primary-color
</style>