<template>
    <div class="form">
        <v-card :loading='loading' class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Client options</v-list-item-title>
                    <div>
                        <v-text-field v-model="client.name"  label="Name" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="client.slim_id"  label="Slim Id" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-select v-model="client.parser" :items="parserList" label="XML parser"></v-select>
                    </div>
                    <v-switch v-model="client.sync"  label="Sync"></v-switch>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-btn class="mr-4" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            Client was successfully updated
        </v-snackbar>
        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            {{snackbar.err_text}}
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'ClientOptions',
        props: ['client'],
        components: {

        },
        data(){
            return{
                snackbar: {
                    success: false,
                    err: false,
                    err_text: ''
                },
                loading: false,
                parserList: []
            }
        },
        methods: {
            save: function () {
                this.loading = true;
                this.$http.put('/api/client', {
                    name:  this.client.name,
                    sync: this.client.sync,
                    id:  this.client.id,
                    slim_id: this.client.slim_id,
                    parser: this.client.parser
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then(() => {
                    this.snackbar.success = true;
                    this.loading = false;
                }, (err) => {
                    this.snackbar.err = true;
                    this.snackbar.err_text = err.body;
                    this.loading = false;
                });
            }
        },
        created: function(){
            this.$http.get('/api/client/parser_list', {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }).then((res) => {
                this.parserList = res.body.files;
            }, () => {
                this.parserList = ['default.js'];
            });
        }
    }
</script>

<style lang="scss">
    .form{
        margin: 20px 40px;
    }
</style>