<template>
    <div class="form">
        <v-card class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Add Client</v-list-item-title>
                    <v-text-field v-model="name" label="Client name" hide-details="auto"></v-text-field>
                    <v-switch v-model="sync" label="Sync"></v-switch>
                    <div class="form">
                        <v-card class="mx-auto" outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Ftp settings(optional)</v-list-item-title>
                                    <v-text-field v-model="ftp_name" label="Ftp name" hide-details="auto"></v-text-field>
                                    <v-text-field v-model="host" label="Host" hide-details="auto"></v-text-field>
                                    <v-text-field v-model="port" label="Port" hide-details="auto"></v-text-field>
                                    <v-text-field v-model="username" label="Username" hide-details="auto"></v-text-field>
                                    <v-text-field v-model="password" type="password" label="Password" hide-details="auto"></v-text-field>
                                </v-list-item-content>
                                )
                            </v-list-item>
                            <v-card-actions>

                            </v-card-actions>
                        </v-card>
                    </div>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-btn class="mr-4" @click="submit">Add</v-btn>
            </v-card-actions>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar" :timeout="2000">
            Client was created
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'AddClient',
        props: ['id'],
        data(){
            return{
                name: '',
                sync: true,
                ftp_name: '',
                host:'',
                port: null,
                username:'',
                password: '',
                snackbar: false
            }
        },
        methods: {
            submit: function () {
                this.$http.put('/api/client', {
                    customer_id: this.id,
                    name: this.name,
                    sync: this.sync,
                    ftp_name: this.ftp_name,
                    host: this.host,
                    port: this.port,
                    username: this.username,
                    password: this.password
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then(() => {
                    this.snackbar = true;
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

</style>