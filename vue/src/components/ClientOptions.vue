<template>
    <div class="form">
        <v-card class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Client options</v-list-item-title>
                    <v-text-field v-model="client.name"  label="Name" hide-details="auto"></v-text-field>
                    <v-text-field v-model="client.slim_id"  label="Slim Id" hide-details="auto"></v-text-field>
                    <v-text-field v-model="client.parser"  label="XML parser" hide-details="auto"></v-text-field>
                    <v-switch v-model="client.sync"  label="Sync"></v-switch>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-btn class="mr-4" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar" :timeout="2000">
            Client was successfully updated
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
                snackbar: false
            }
        },
        methods: {
            save: function () {
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
                    this.snackbar = true;
                }, (err) => {
                    console.log(err);
                });
            }
        },
        created: function(){

        }
    }
</script>

<style lang="scss">
    .form{
        margin: 20px 40px;
    }
</style>