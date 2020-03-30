<template>
    <div class="table">

        <v-card color="grey darken-3" :loading="loading">
            <v-card-title>
                Customers
                <v-spacer></v-spacer>
                <v-text-field v-model="search_string" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>

            <v-data-table background-color="blue-grey darken-3" dense :headers="headers" :items="customers" :search="search_string">
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="goToCustomer(item.id)">account_box</v-icon>
                    <v-icon small @click="deleteCustomer(item.id)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            Customer was deleted
        </v-snackbar>
        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            Can`t get customer list
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'CustomerList',
        data(){
            return{
                search_string: '',
                loading: true,
                snackbar: {
                    success: false,
                    err: false
                },
                headers: [
                    {
                        text: 'ID',
                        value: 'id',
                        filterable: true
                    },
                    {
                        text: 'Name',
                        value: 'name',
                        filterable: true
                    },
                    {
                        text: 'Slim ID',
                        value: 'slim_organisation_id',
                        filterable: true
                    },
                    {
                        text: 'Active',
                        value: 'active'
                    },
                    {
                        text: 'Actions',
                        value: 'actions'
                    }
                ]
            }
        },
        methods: {
            goToCustomer(id){
                this.$router.push({ path: '/customer', query: { id: id } })
            },
            deleteCustomer(id){
                if (window.confirm("Do you really want to delete customer? id=" + id)) {
                    this.$http.delete('/api/customer?id=' + id, {
                        headers: {
                            Authorization: localStorage.getItem('jwt')
                        }
                    }).then((res) => {
                        console.log(res);
                        this.snackbar.success = true;
                        this.$store.commit('delCustomer', id);
                    }, (err) => {
                        console.log(err.bodyText);
                    });
                }
            }
        },
        created: function(){
            this.$http.get('/api/customer', {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }).then((res) => {
                console.log(res);
                this.$store.state.customers = res.body.customers;
                this.loading = false;
            }, (err) => {
                console.log(err);
                this.snackbar.err = true;
            });
        },
        computed:{
            customers(){
                return this.$store.state.customers;
            }
        },
        destroyed: function(){
            this.$store.state.customers = [];
        }
    }
</script>

<style lang="scss">
    .table{
        margin: 10px 20px;
    }
</style>