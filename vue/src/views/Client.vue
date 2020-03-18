<template>
    <div>
        <v-progress-linear v-if="!client.id" indeterminate color="cyan"></v-progress-linear>
        <v-card v-if="client.id" class="menu">
            <v-toolbar flat color="primary" dark>
                <div>
                    Client Profile
                    <v-chip class="ma-2" label>ID: {{client.id}}</v-chip>
                    <v-chip class="ma-2" label>Name: {{client.name}}</v-chip>
                    <v-chip class="ma-2" label>Sync: {{client.sync}}</v-chip>
                </div>
            </v-toolbar>
            <v-tabs vertical>
                <v-tab>
                    <v-icon left>local_shipping</v-icon>
                    Orders
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-lock</v-icon>
                    Zip zones
                </v-tab>
                <v-tab>
                    <v-icon left>settings</v-icon>
                    Client settings
                </v-tab>
                <v-tab>
                    <v-icon left>settings_applications</v-icon>
                    Ftp settings
                </v-tab>
                <v-tab>
                    <v-icon left>rowing</v-icon>
                    Load XML
                </v-tab>
                <v-tab-item>
                    <v-card class="menu" flat>
                        <OrderList :orders="client.orders"></OrderList>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card class="menu" flat>
                        <ZoneList :zones="client.zip_zones" :id="client.id"></ZoneList>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <ClientOptions :client="client"></ClientOptions>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <FtpSettings :ftp_settings="client.ftp_setting"></FtpSettings>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <Load :id="id"></Load>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>

<script>
    import ZoneList from '@/components/ZoneList.vue'
    import FtpSettings from '@/components/FtpSettings.vue'
    import ClientOptions from '@/components/ClientOptions.vue'
    import OrderList from '@/components/OrderList.vue'
    import Load from '@/components/Load.vue'

    export default {
        name: 'Client',
        props: ['id'],
        components: {
            ZoneList,
            FtpSettings,
            ClientOptions,
            OrderList,
            Load
        },
        data(){
            return{
                client: {}
            }
        },
        methods: {

        },
        created: function(){
            this.$http.get('/api/client/profile?id=' + this.id, {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }).then((res) => {
                this.client = res.body.client;
                this.loading = false;
            }, (err) => {
                console.log(err);
            });
        }
    }
</script>

<style lang="scss">
    .menu{
        margin: 10px;
    }
</style>