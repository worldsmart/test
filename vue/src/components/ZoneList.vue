<template>
    <div>
        <div>
            <v-menu v-model="menu" offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                    <v-card
                            class="mx-auto card add_button"
                            max-width="344"
                            outlined
                            v-on="on"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-list-item-title class="headline mb-1">Add new</v-list-item-title>

                            </v-list-item-content>
                            <v-icon>library_add</v-icon>
                        </v-list-item>
                    </v-card>
                </template>
                <v-card
                        class="mx-auto"
                        max-width="344"
                        outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">Zip zone</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <div style="margin:10px">
                        <v-text-field v-model="name" label="Name"></v-text-field>
                        <v-text-field v-model="group" label="Plan group"></v-text-field>
                        <div style="margin:10px">
                            <v-toolbar style="padding: 10px">
                                <v-text-field v-model="zip" label="Add zip"></v-text-field>
                                <v-btn icon @click="addZip">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-toolbar>
                        </div>
                        <div>
                            Zip codes: <v-chip class="ma-2" v-for="(value, name) in zip_codes" :key="name" @click="delZip(name)">{{value}}</v-chip>
                        </div>
                    </div>
                    <v-card-actions>
                        <v-btn @click="menu = false" text>Close</v-btn>
                        <v-btn @click="add_zone" text>Add</v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
            <v-card
                    class="mx-auto card"
                    max-width="344"
                    outlined
                    v-for="item in zones" :key="item.id"
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">{{item.plangroup}}</div>
                        <v-list-item-title class="headline mb-1">{{item.name}}</v-list-item-title>
                        <v-list-item-subtitle>
                            ID:{{item.id}}
                        </v-list-item-subtitle>
                        <div>
                            Zip codes: <v-chip class="ma-2" v-for="zip in item.zip_code_list" :key="zip">{{zip}}</v-chip>
                        </div>
                    </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                    <v-btn text>Remove</v-btn>
                </v-card-actions>
            </v-card>
        </div>

        <v-snackbar color="success" top right v-model="snackbar" :timeout="2000">
            Zip zone was successfully created
        </v-snackbar>
    </div>
</template>

<script>

    export default {
        name: 'ZoneList',
        props: ['zones', 'id'],
        components: {

        },
        data(){
            return{
                zip: '',
                name: '',
                group: '',
                zip_codes: [],
                menu: false,
                snackbar: false
            }
        },
        methods: {
            add_zone: function(){
                this.$http.put('/api/zone', {
                    name: this.name,
                    plangroup: this.group,
                    zip_code_list: this.zip_codes,
                    client_id: this.id
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    this.zones.unshift(res.body.zone);
                    this.menu = false;
                    this.snackbar = true;
                }, (err) => {
                    console.log(err);
                });
            },
            addZip: function () {
                this.zip_codes.push(this.zip);
                this.zip = '';
            },
            delZip: function (id) {
                this.zip_codes.splice(id, 1);
            }
        },
        created: function(){

        }
    }
</script>

<style lang="scss">
    .card{
        margin: 5px;
    }
    .add_button{
        cursor: pointer;
    }
</style>