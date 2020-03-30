<template>
    <div style="margin: 10px 10px auto 10px">
            <v-progress-linear
                indeterminate
                color="cyan"
                v-if="!client.id"
        ></v-progress-linear>
        <div style="margin: 10px" v-if="client.id">
            Client:
            <v-chip class="ma-2" label>ID: {{client.id}}</v-chip>
            <v-chip class="ma-2" label>Name: {{client.name}}</v-chip>
            <v-chip class="ma-2" label>Slim Id: {{client.slim_id}}</v-chip>
            <v-chip class="ma-2" label>Sync: {{client.sync}}</v-chip>
            <v-chip class="ma-2" label>XML parser: {{client.parser}}</v-chip>
            <v-chip class="ma-2" label>Customer name: {{client.customer.name}}</v-chip>
            <v-chip class="ma-2" label>Customer slim Id: {{client.customer.slim_organisation_id}}</v-chip>
        </div>
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
        </v-tabs>

        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            Can`t get client profile
        </v-snackbar>
    </div>
</template>

<script>
    import ZoneList from '@/components/ZoneList.vue'
    import FtpSettings from '@/components/FtpSettings.vue'
    import ClientOptions from '@/components/ClientOptions.vue'
    import OrderList from '@/components/OrderList.vue'

    export default {
        name: 'Client',
        props: ['id'],
        components: {
            ZoneList,
            FtpSettings,
            ClientOptions,
            OrderList
        },
        data(){
            return{
               snackbar:{
                   err: false
               }
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
                this.$store.state.client = res.body.client;
            }, () => {
                this.snackbar.err = true;
            });
        },
        destroyed: function(){
            this.$store.state.client = {};
        },
        computed: {
            client(){
                return this.$store.state.client
            }
        }
    }
</script>

<style lang="scss">
    .menu{
        margin: 10px;
    }
</style>