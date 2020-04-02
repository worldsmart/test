<template>
    <div class="form">
        <v-card :loading='loading' class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Add Client</v-list-item-title>
                    <div>
                        <v-text-field v-model="name" label="Client name" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="slim_id" label="Slim Id" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-select v-model="parser" :items="parserList" label="XML parser"></v-select>
                    </div>
                    <v-switch v-model="sync" label="Sync"></v-switch>
                    <div class="form">
                        <v-card class="mx-auto" outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Ftp settings(optional)</v-list-item-title>
                                    <v-switch v-model="use_sftp" label="Use SFTP( FTP via SSH key )"></v-switch>
                                    <div >
                                    <div v-if="use_sftp">
                                        <v-textarea
                                        filled
                                        name="input-7-4"
                                        label="SSH key"
                                        v-model="ssh_key"
                                        ></v-textarea>
                                        <v-file-input @change="loadTextFromFile()" show-size v-model='ssh_key_file' multiple label="Load from file"></v-file-input>
                                    </div>
                                        <div>
                                        <v-text-field v-model="ftp_name" label="Ftp name" hide-details="auto"></v-text-field>
                                    </div>
                                    <div>
                                        <v-text-field v-model="host" label="Host" hide-details="auto"></v-text-field>
                                    </div>
                                    <div>
                                        <v-text-field v-model="port" label="Port" hide-details="auto"></v-text-field>
                                    </div>
                                    <div>
                                        <v-text-field v-model="username" label="Username" hide-details="auto"></v-text-field>
                                    </div>
                                    <div>
                                        <v-text-field v-model="password" type="password" label="Password" hide-details="auto"></v-text-field>
                                    </div>
                                    <div>
                                        <v-text-field v-model="data_path" label="Data path" hide-details="auto"></v-text-field>
                                    </div>
                                    <div>
                                        <v-text-field v-model="done_path" label="Done path" hide-details="auto"></v-text-field>
                                    </div>
                                    <div>
                                        <v-text-field v-model="err_path" label="Err path" hide-details="auto"></v-text-field>
                                    </div>
                                    </div>
                                </v-list-item-content>
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

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            Client was created
        </v-snackbar>
        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            {{snackbar.err_text}}
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
                snackbar: {
                    success: false,
                    err:false,
                    err_text: ''
                },
                data_path: '',
                done_path: '',
                err_path: '',
                slim_id: '',
                parserList: 'default',
                parser: '',
                loading: false,
                ssh_key: '',
                use_sftp: false,
                ssh_key_file: {}
            }
        },
        methods: {
            submit: function () {
                this.loading = true;
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
                    parser: this.parser,
                    ssh_key: this.ssh_key,
                    use_sftp: this.use_sftp
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    this.snackbar.success = true;
                    this.$store.state.customer.clients.unshift(res.body.client);
                    this.loading = false;
                }, (err) => {
                    this.snackbar.err = true;
                    this.snackbar.err_text = err.body;
                    this.loading = false;
                });
            },
            loadTextFromFile() {
                const file = this.ssh_key_file[0];
                const reader = new FileReader();

                reader.onload = e => {
                    this.ssh_key = e.target.result;
                }
                reader.readAsText(file);
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

</style>