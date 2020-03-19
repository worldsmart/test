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

        <v-snackbar color="success" top right v-model="snackbar" :timeout="2000">
            Customer was deleted
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'CustomerList',
        data(){
            return{
                customers: [],
                search_string: '',
                loading: true,
                snackbar: false,
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
            search(){
                this.display_customers = this.customers.filter((customer)=>{
                    return !customer.name.indexOf(this.search_string);
                });
            },
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
                        this.snackbar = true;
                        this.customers = this.customers.filter(customer=>{
                            return customer.id == id ? false : true;
                        });
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
                this.customers = res.body.customers;
                this.display_customers = this.customers;
                this.loading = false;
            }, (err) => {
                console.log(err);
            });
        }
    }
</script>

<style lang="scss">
    .table{
        margin: 10px 20px;
    }
</style>