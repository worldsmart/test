<template>
    <div class="form">
        <v-card class="mx-auto" outlined>
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
    </div>
</template>

<script>
    export default {
        name: 'AddCustomerForm',
        data(){
            return{
                name: '',
                slim_id: '',
                active: true
            }
        },
        methods: {
            submit: function () {
                this.$http.put('/api/customer', {
                    name: this.name,
                    slim_id: this.slim_id,
                    active: this.active
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    console.log(res);
                    document.location.reload(true);
                }, (err) => {
                    console.log(err);
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