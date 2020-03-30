<template>
    <div class="form">
        <v-card :loading='loading' class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Add Customer</v-list-item-title>
                    <form class="add_customer_form">
                        <v-text-field v-model="name" label="Customer name" hide-details="auto"></v-text-field>
                        <v-text-field v-model="slim_id" label="Slim organisation ID" hide-details="auto"></v-text-field>
                        <v-switch v-model="active" label="Active"></v-switch>
                        <v-btn class="mr-4" @click="submit">add</v-btn>
                    </form>
                </v-list-item-content>
            </v-list-item>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            Customer was created
        </v-snackbar>
        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            {{snackbar.err_text}}
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'AddCustomerForm',
        data(){
            return{
                name: '',
                slim_id: '',
                active: true,
                loading: false,
                snackbar:{
                    success: false,
                    err: false,
                    err_text: ''
                }
            }
        },
        methods: {
            submit: function () {
                this.loading = true;
                this.$http.put('/api/customer', {
                    name: this.name,
                    slim_id: this.slim_id,
                    active: this.active
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    this.loading = false;
                    this.$store.state.customers.unshift(res.body.customer);
                    this.snackbar.success = true;
                }, (err) => {
                    this.loading = false;
                    this.snackbar.err = true;
                    this.snackbar.err_text = err.body;
                });
            }
        }
    }
</script>

<style lang="scss">
    .form{
        margin: 20px 40px;
    }
</style>