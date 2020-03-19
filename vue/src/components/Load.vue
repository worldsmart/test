<template>
    <div>
        <v-file-input :rules="[xml_checkup]" :loading="loading" show-size chips accept="text/xml" v-model="file" label="XML input"></v-file-input>
        <v-btn :disabled="loading" @click="submit">Load</v-btn>
        <v-btn :disabled="loading" @click="upload">Upload from FTP server</v-btn>

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            Orders was uploaded
        </v-snackbar>

        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            <div>
                {{snackbar.err_text}}
            </div>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'Load',
        props: ['id'],
        data(){
            return{
                file: [],
                loading: false,
                snackbar: {
                    success: false,
                    err: false,
                    err_text: ''
                }
            }
        },
        methods: {
            xml_checkup(){
                if(this.file.type !== 'text/xml'){
                    return "Input accept only .xml files";
                }
                return true;
            },
            submit: function () {
                this.loading = true;
                let formData = new FormData();
                formData.append('id', this.id);
                formData.append('xml', this.file);
                this.$http.put('/api/ftp/load', formData,{
                    headers: {
                        Authorization: localStorage.getItem('jwt'),
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    console.log(res)
                    this.loading = false;
                }, (err) => {
                    console.log(err);
                });
            },
            upload: function () {
                this.loading = true;
                this.$http.get('/api/ftp/xml?id=' + this.id, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    if(res.status == 200){
                        this.loading = false;
                        this.snackbar.success = true;
                        document.location.reload(true);
                    }else {
                        this.loading = false;
                        this.snackbar.err_text = res.body;
                        this.snackbar.err = true;
                    }
                }, (err) => {
                    console.log(err);
                    this.loading = false;
                    this.snackbar.err_text = err.body;
                    this.snackbar.err = true;
                });
            }
        },
        created: function(){

        }
    }
</script>

<style lang="scss">

</style>