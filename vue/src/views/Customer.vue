<template>
    <div>
        <v-progress-linear v-if="!customer.id" indeterminate color="cyan"></v-progress-linear>
        <div style="margin:10px">
            Customer Profile
            <v-chip class="ma-2" label>ID: {{customer.id}}</v-chip>
            <v-chip class="ma-2" label>Name: {{customer.name}}</v-chip>
            <v-chip class="ma-2" label>Slim ID: {{customer.slim_organisation_id}}</v-chip>
            <v-chip class="ma-2" label>Active: {{customer.active}}</v-chip>
        </div>
        <v-tabs class="elevation-2">
            <v-tabs-slider></v-tabs-slider>
            <v-tab>
                Clients
            </v-tab>
            <v-tab>
                Options
            </v-tab>
            <v-tab>
                Add client
            </v-tab>

            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <ClientList :id="id" :clients="customer.clients"></ClientList>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <CustomerOptions :customer="customer"></CustomerOptions>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <AddClient :id="id"></AddClient>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import ClientList from '@/components/ClientList.vue'
    import AddClient from '@/components/AddClient.vue'
    import CustomerOptions from '@/components/CustomerOptions.vue'

    export default {
        name: 'Customer',
        props: ['id'],
        components: {
            ClientList,
            AddClient,
            CustomerOptions
        },
        data(){
            return{
                customer: {}
            }
        },
        methods: {

        },
        created: function(){
            this.$http.get('/api/customer?id=' + this.id, {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }).then((res) => {
                console.log(res);
                this.customer = res.body.customer;
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