<template>
    <div>
        <v-file-input :rules="[xml_checkup]" :loading="loading" show-size chips accept="text/xml" v-model="file" label="XML input"></v-file-input>
        <v-btn :disabled="loading" @click="submit">Load</v-btn>
    </div>
</template>

<script>
    export default {
        name: 'Load',
        props: ['id'],
        data(){
            return{
                file: [],
                loading: false
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
            }
        },
        created: function(){

        }
    }
</script>

<style lang="scss">

</style>