<template>
    <div class="content">
        <div class="container search-bar px-0">
            <form method="get" action="http://www.google.co.za/search">
                <div class="input-group search-bar">
                    <input id="searchG" type="text" name="q" class="form-control search-bar" autocomplete="off" autofocus placeholder="Google Search">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar'
}
</script>

<style lang="sass">
@import ../../assets/palette

form.search-form
  width: 100%

input::-webkit-input-placeholder
  color: #888 !important

input.search-bar
  margin-top: 10px
  border-width: 2px
  color: $primary-text-color
  border-color: white
  border-radius: 0px
  box-shadow: 0px 8px 2px -2px rgba(5, 5, 5, 0.2)

input.search-bar:focus
  box-shadow: 0px 8px 2px -2px rgba(5, 5, 5, 0.2)
  border-color: white


input.search-bar:hover
  box-shadow: 0px 8px 2px -2px rgba(5, 5, 5, 0.2)
  border-color: white

</style>