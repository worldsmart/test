<template>
    <div>
        <v-toolbar style="margin: 10px">
            Client:
            <v-chip class="ma-2" label>ID: {{client.id}}</v-chip>
            <v-chip class="ma-2" label>Name: {{client.name}}</v-chip>
            <v-chip class="ma-2" label>Slim Id: {{client.slim_id}}</v-chip>
            <v-chip class="ma-2" label>Sync: {{client.sync}}</v-chip>
            <v-chip class="ma-2" label>XML parser: {{client.parser}}</v-chip>
        </v-toolbar>
        <v-progress-linear
                indeterminate
                color="cyan"
                v-if="!client.id"
        ></v-progress-linear>
        <v-tabs v-if="client.id" class="elevation-2">
            <v-tabs-slider></v-tabs-slider>
            <v-tab>
                Orders
            </v-tab>
            <v-tab>
                Zip zones
            </v-tab>
            <v-tab>
                Client settings
            </v-tab>
            <v-tab>
                Ftp settings
            </v-tab>
            <v-tab>
                Load XML
            </v-tab>

            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <OrderList :orders="client.orders"></OrderList>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <ZoneList :zones="client.zip_zones" :id="client.id"></ZoneList>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <ClientOptions :client="client"></ClientOptions>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <FtpSettings :ftp_settings="client.ftp_setting"></FtpSettings>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <Load :id="id"></Load>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
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
                console.log(this.client)
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