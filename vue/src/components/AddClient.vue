<template>
    <div class="form">
        <v-card class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Add Client</v-list-item-title>
                    <v-text-field v-model="name" label="Client name" hide-details="auto"></v-text-field>
                    <v-text-field v-model="slim_id" label="Slim Id" hide-details="auto"></v-text-field>
                    <v-text-field v-model="parser" label="XML parser" hide-details="auto"></v-text-field>
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
                                    <v-text-field v-model="data_path" label="Data path" hide-details="auto"></v-text-field>
                                    <v-text-field v-model="done_path" label="Done path" hide-details="auto"></v-text-field>
                                    <v-text-field v-model="err_path" label="Err path" hide-details="auto"></v-text-field>
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
                snackbar: false,
                data_path: '',
                done_path: '',
                err_path: '',
                slim_id: '',
                parser: 'default'
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
                    password: this.password,
                    data_path: this.data_path,
                    done_path: this.done_path,
                    err_path: this.err_path,
                    slim_id: this.slim_id,
                    parser: this.parser
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