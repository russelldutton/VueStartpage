<template>
    <div id="settings">
        <router-link class="settings" to="/home">
            <i class="fas fa-home fa-2x home-icon"></i>
        </router-link>
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <h2>Settings</h2>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <!-- Edit IconBar list -->
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h4>Icon Bar</h4>
                        </div>
                        <div class="card-body container-fluid">
                            <div class="row">
                                <div class="col">
                                    <draggable class="list-group" :list="iconbar.iconbar" @start="drag=true" @end="drag=false; save()">
                                        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" v-for="(icon, i) in iconbar.iconbar" :key="i" v-if="icon.name">
                                            <i :class="icon.icon"></i>
                                            <span class="name">{{icon.name}}</span>
                                            <span>
                                                <button class="button pointer" data-toggle="modal" data-target="#iconModal" @click="setCurrentIcon(icon, i)">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="button ml-2 pointer" @click="deleteIcon(i)">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </span>
                                        </div>
                                        <button class="list-group-item btn btn-outline-primary button-add" slot="footer" @click="addIconToBar">Add</button>
                                    </draggable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End IconBar list -->

                <!-- Edit Bookmarks list -->
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h4>Bookmark Cards</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <draggable class="list-group" :list="bookmarks.bookmarks" @start="drag=true" @end="drag=false; save()">
                                        <div class="list-group-item list-group-item-action d-flex" v-for="(bm, i) in bookmarks.bookmarks" :key="i" v-if="bm.name">
                                            <span class="name col-md-3">{{bm.name}}</span>
                                            <span class="link col-md-6"># links: {{bm.links.length}}</span>
                                            <span class="col-md-3">
                                                <button class="button pointer" data-toggle="modal" data-target="#bookModal" @click="setCurrentBookmark(bm, i)">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="button ml-2 pointer" @click="deleteBookmark(i)">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </span>
                                        </div>
                                        <button class="list-group-item btn btn-outline-primary button-add" slot="footer" @click="addBookmarkToBookBar()">Add</button>
                                    </draggable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Bookmarks list -->

        <!-- Icon Modal -->
        <div class="modal fade" id="iconModal" tabindex="-1" role="dialog" aria-labelledby="iconEditHeader">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="iconEditHeader">Edit Icon</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <IconEdit :icon="currentIcon.icon" @update-icon="receiveIconUpdate"></IconEdit>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bookmark Modal -->
        <div class="modal fade" id="bookModal" tabindex="-1" role="dialog" aria-labelledby="bookEditHeader" ref="bookmodal">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="bookEditHeader">Edit Bookmark Card</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <BookmarkEdit :bm="currentBookmark.bm" :isModalShown="bookModalIsShown" @update-bookmark="receiveBookmarkUpdate"></BookmarkEdit>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

import IconEdit from './Settings/IconEdit'
import BookmarkEdit from './Settings/BookmarkEdit'

export default {
    name: 'Settings',
    components: {
        draggable,
        IconEdit,
        BookmarkEdit
    },
    mounted: function() {
        $("#bookModal").on("hide.bs.modal", this.setModalHidden);
    },
    beforeDestroy: function() {
        $("#bookModal").off("hide.bs.modal", this.setModalHidden);
        this.save();
    },
    data() {
        return {
            iconbar: this.$ls.get('iconbar'),
            bookmarks: this.$ls.get('bookmarks'),
            currentIcon: {
                index: -1,
                icon: {
                    name: "",
                    icon: "",
                    link: ""
                }
            },
            currentBookmark: {
                index: -1,
                bm: {
                    name: '',
                    links: []
                }
            },
            bookModalIsShown: false
        };
    },
    methods: {
        addIconToBar: function() {
            var index = this.iconbar.iconbar.length;
            var icon = {
                name: '',
                icon: '',
                link: ''
            };
            this.iconbar.iconbar.push(icon);
            $("#iconModal").modal('show');
            this.setCurrentIcon(icon, index);
        },
        setCurrentIcon: function(icon, index) {
            this.currentIcon.icon = icon,
            this.currentIcon.index = index
        },
        receiveIconUpdate: function(iconUpdate) {
            this.iconbar.iconbar[this.currentIcon.index].name = iconUpdate.name;
            this.iconbar.iconbar[this.currentIcon.index].icon = iconUpdate.icon;
            this.iconbar.iconbar[this.currentIcon.index].link = iconUpdate.link;
            $("#iconModal").modal('hide');
            this.$ls.set('iconbar', this.iconbar);
        },
        deleteIcon: function(index) {
            var ans = window.confirm("Are you sure you wish to delete this icon?");
            if (ans) this.iconbar.icons.splice(index, 1);
        },
        addBookmarkToBookBar: function() {
            var index = this.bookmarks.bookmarks.length;
            var bookmark = {
                name: '',
                links: []
            };
            this.bookmarks.bookmarks.push(bookmark);
            $("#bookModal").modal('show');
            this.setCurrentBookmark(bookmark, index);
        },
        setCurrentBookmark: function(bm, index) {
            this.currentBookmark.bm = bm;
            this.currentBookmark.index = index;
            this.bookModalIsShown = true;
        },
        receiveBookmarkUpdate: function(bookmarkUpdate) {
            let index = this.currentBookmark.index;
            this.bookmarks.bookmarks[index].name = bookmarkUpdate.name;
            this.bookmarks.bookmarks[index].links = bookmarkUpdate.links;
            $("#bookModal").modal('hide');
            this.$ls.set('bookmarks', this.bookmarks);
        },
        deleteBookmark: function(index) {
            var ans = window.confirm("Are you sure you wish to delete this bookmark?");
            if (ans) this.bookmarks.bookmarks.splice(index, 1);
        },
        setModalHidden: function() {
            this.bookModalIsShown = false;
            if (this.currentBookmark.index == this.bookmarks.bookmarks.length - 1 && (this.currentBookmark.bm.name == '' || this.currentBookmark.bm.links.length == 0)) {
                this.deleteBookmark(this.currentBookmark.index);
            }
        },
        save: function() {
            this.$ls.set('bookmarks', this.bookmarks); 
            this.$ls.set('iconbar', this.iconbar);
        }
    }
}
</script>

<style lang="sass">
@import ../assets/palette

h1, h2, h3, h4, h5, h6
    color: $secondary-text-color

.button
    background: none
    border: none
    transition: ease-out 0.3s transform

.button:hover
    transform: scale(1.2, 1.2)

.button-add
    border: 2pt dashed

.container
    padding-top: 10px
    padding-bottom: 10px

.card-header
    margin-top: 5px
    margin-bottom: 5px
    padding-bottom: 2px

i
    color: $primary-color
    text-decoration: none

i:hover
    color: inherit
    text-decoration: none

.pointer
    cursor: pointer

div.list-group-item
    cursor: move

span.name
    color: $primary-text-color
    margin-right: 2pt
    font-weight: bold

span.link
    color: $primary-text-color
    font-size: 12pt;

.settings
    position: absolute
    z-index: 1000
    top: 10px
    right: 10px

.home-icon
    transition: ease 0.2s transform

.home-icon:hover
    transform: scale(1.5)

.list-group-item
    border-color: $divider-color
</style>