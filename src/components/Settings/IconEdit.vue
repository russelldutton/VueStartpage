<template>
    <div id="icon-edit">
        <form>
            <div class="form-group d-flex align-items-start flex-column">
                <label for="iconName">Name of Icon</label>
                <input type="text" class="form-control" id="iconName" v-model="localName">
            </div>
            <div class="form-group d-flex align-items-start flex-column">
                <label for="iconIcon">Font Awesome Icon code</label>
                <input type="text" class="form-control" id="iconIcon" v-model="localIcon">
            </div>
            <div class="form-group d-flex align-items-start flex-column">
                <label for="iconLink">Link of icon</label>
                <input type="text" class="form-control" id="iconLink" v-model="localLink">
            </div>
        </form>

        <div class="container-fluid">
            <h5>Test the Icon:</h5>
            <div class="d-flex align-items-center flex-column">
                <a :href="localLink" target="_blank">
                    <i :class="localIcon"></i>
                </a>
                <p>{{localName}}</p>
            </div>
        </div>
        <div class="container-fluid">
            <button type="button" class="btn btn-outline-success" @click="emitIcon">Update</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IconEdit',
    props: {
        icon: {
            name: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            }
        }
    },
    data() {
        return {
            localName: this.icon.name,
            localIcon: this.icon.icon,
            localLink: this.icon.link
        }
    },
    methods: {
        emitIcon: function() {
            this.$emit('update-icon', {
                name: this.localName,
                icon: this.localIcon,
                link: this.localLink
            })
        }
    },
    watch: {
        icon: function(newIcon, oldIcon) {
            this.localName = newIcon.name;
            this.localIcon = newIcon.icon;
            this.localLink = newIcon.link;
        }
    }
}
</script>

<style>
</style>