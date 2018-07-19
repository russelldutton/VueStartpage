<template>
    <div id="bookmark-edit">
        <form>
            <div class="form-group d-flex align-items-start flex-column">
                <label for="bookName">Name of card</label>
                <input type="text" class="form-control" id="bookName" v-model="localName">
            </div>
            <div class="collapse" id="editLinkCollapse">
                <hr>
                <h6 class="form-group d-flex align-items-start">Edit Bookmark</h6>
                <div class=" form-group row">
                    <div class="col">
                        <input type="text" class="form-control" v-model="currentLink.name">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" v-model="currentLink.link">
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-outline-primary px-2" @click="saveLink()">
                            <i class="fas fa-check" style="color: inherit"></i>
                        </button>
                    </div>
                </div>
                <hr>
            </div>
            <div class="form-group d-flex align-items-start flex-column">
                <h6>Bookmarks</h6>
                <draggable
                    class="list-group w-100"
                    :list="localLinks"
                    @start="drag=true"
                    @end="drag=false">
                        <div class="list-group-item list-group-item-action d-flex justify-content-between" v-for="(link, i) in localLinks" :key="i" v-if="link.name">
                            <span class="name">{{link.name}}</span>
                            <span>
                                <span class="link">{{link.link}}</span>
                                <button class="button pointer" @click="setCurrentLink(link, i)">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="button pointer" @click="deleteLink(i)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </span>
                        </div>
                        <button class="list-group-item btn btn-outline-primary button-add" slot="footer" @click="addBookmark()">Add</button>
                </draggable>
            </div>
        </form>
        <div class="container-fluid">
            <button type="button" class="btn btn-outline-success" @click="emitBookmarks">Update</button>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
var _ = require('lodash')

export default {
    name: "BookmarkEdit",
    props: {
        bm: {
            name: String,
            links: Array()
        },
        isModalShown: Boolean
    },
    components: {
        draggable
    },
    data() {
        return {
            localName: this.bm.name,
            localLinks: this.bm.links,
            currentLink: {
                index: -1,
                name: '',
                link: ''
            }
        }
    },
    methods: {
        emitBookmarks: function() {
            if (this.localName == '' || this.localLinks.length == 0) {
                //TODO Validation on missing information
            }
            this.saveLink();
            this.$emit('update-bookmark', {
                name: this.localName,
                links: this.localLinks
            })
        },
        setCurrentLink: function(link, index) {
            this.currentLink.name = link.name;
            this.currentLink.link = link.link;
            this.currentLink.index = index;
            $("#editLinkCollapse").collapse('show');
        },
        deleteLink: function(index) {
            var ans = window.confirm("Are you sure you want to delete this link?");
            if (ans) this.localLinks.splice(index, 1);
        },
        addBookmark: function() {
            $("#editLinkCollapse").collapse('show');
            var index = this.localLinks.length;
            var tempLink = {
                name: 'edit name here',
                link: 'edit link here'
            };
            this.localLinks.push(tempLink);
            this.currentLink.name = tempLink.name;
            this.currentLink.link = tempLink.link;
            this.currentLink.index = index;
        },
        saveLink: function() {
            var index = this.currentLink.index;
            this.localLinks[index].name = this.currentLink.name;
            this.localLinks[index].link = this.currentLink.link;
            $("#editLinkCollapse").collapse('hide');
        }
    },
    watch: {
        bm: function(newBm, oldBm) {
            this.localName = newBm.name;
            this.localLinks = newBm.links;
        },
        isModalShown: function() {
            if (!this.isModalShown) {
                $("#editLinkCollapse").collapse('hide');
            }
        }
    }
}
</script>

<style lang="sass">
.button
    background: none
    border: none
    transition: ease-out 0.3s transform

.button:hover
    transform: scale(1.2, 1.2)

.pointer
    cursor: pointer
</style>