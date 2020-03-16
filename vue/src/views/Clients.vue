<template>
    <v-card class="menu">
        <v-toolbar flat color="primary" dark>
            <v-toolbar-title>Clients</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
            <v-tab>
                <v-icon left>mdi-account</v-icon>
                Client List
            </v-tab>
            <v-tab-item>
                <v-card class="menu" flat>
                    <ClientList></ClientList>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
    import ClientList from '@/components/ClientList.vue'

    export default {
        name: 'Customers',
        components: {
            ClientList
        },
        data(){
            return{

            }
        },
        methods: {

        },
        created: function(){

        }
    }
</script>

<style lang="scss">

</style>