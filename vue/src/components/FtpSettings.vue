<template>
    <div class="form">
        <v-card :loading='loading' class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Ftp settings</v-list-item-title>
                    <div>
                        <v-text-field v-model="ftp_settings.name" label="Ftp name" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="ftp_settings.host" label="Host" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="ftp_settings.port" label="Port" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="ftp_settings.user" label="User" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="ftp_settings.password" label="Password" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="ftp_settings.data_path" label="Data path" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="ftp_settings.done_path" label="Done path" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="ftp_settings.err_path" label="Err path" hide-details="auto"></v-text-field>
                    </div>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-btn class="mr-4" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            Ftp settings was successfully updated
        </v-snackbar>
        <v-snackbar color="success" top right v-model="snackbar.err" :timeout="2000">
            {{snackbar.err_text}}
        </v-snackbar>
    </div>
</template>

<script>

    export default {
        name: 'FtpSettings',
        props: ['ftp_settings'],
        components: {

        },
        data(){
            return{
                snackbar: {
                    success: false,
                    err: false,
                    err_text: ''
                },
                loading: false
            }
        },
        methods: {
            save: function () {
                this.loading = true;
                if(!this.ftp_settings.port){
                    this.ftp_settings.port = null;
                }
                this.$http.put('/api/ftp', this.ftp_settings, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then(() => {
                    this.snackbar.success = true;
                    this.loading = false;
                }, (err) => {
                    this.snackbar.err_text = err.body;
                    this.snackbar.err = true;
                    this.loading = false;
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