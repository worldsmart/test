<template>
    <div>
        <v-progress-linear v-if="!customer.id" indeterminate color="cyan"></v-progress-linear>
        <v-card v-if="customer.id" class="menu">
            <v-toolbar flat color="primary" dark>
                <v-toolbar-title>
                    <div>
                        Customer Profile
                        <v-chip class="ma-2" label>ID: {{customer.id}}</v-chip>
                        <v-chip class="ma-2" label>Name: {{customer.name}}</v-chip>
                        <v-chip class="ma-2" label>Slim ID: {{customer.slim_organisation_id}}</v-chip>
                        <v-chip class="ma-2" label>Active: {{customer.active}}</v-chip>
                    </div>
                </v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
                <v-tab>
                    <v-icon left>mdi-account</v-icon>
                    Clients
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-lock</v-icon>
                    Options
                </v-tab>
                <v-tab>
                    <v-icon left>playlist_add</v-icon>
                    Add Client
                </v-tab>
                <v-tab-item>
                    <v-card class="menu" flat>
                        <ClientList :id="id" :clients="customer.clients"></ClientList>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <CustomerOptions :customer="customer"></CustomerOptions>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <AddClient :id="id"></AddClient>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
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