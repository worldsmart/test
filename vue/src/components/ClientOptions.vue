<template>
    <div class="form">
        <v-card class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Client options</v-list-item-title>
                    <v-text-field v-model="client.name"  label="Name" hide-details="auto"></v-text-field>
                    <v-switch v-model="client.sync"  label="Sync"></v-switch>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-btn class="mr-4" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
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

            }
        },
        methods: {
            save: function () {
                this.$http.put('/api/client', {
                    name:  this.client.name,
                    sync: this.client.sync,
                    id:  this.client.id
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then(() => {
                    document.location.reload(true);
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