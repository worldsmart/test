<template>
    <v-card class="menu">
        <v-toolbar flat color="primary" dark>
            <v-toolbar-title>Customers</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
            <v-tab>
                <v-icon left>mdi-account</v-icon>
                Customer List
            </v-tab>
            <v-tab>
                <v-icon left>mdi-lock</v-icon>
                Add customer
            </v-tab>
            <v-tab-item>
                <v-card class="menu" flat>
                    <CustomerList></CustomerList>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <AddCustomer></AddCustomer>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
    import CustomerList from '@/components/CustomerList.vue'
    import AddCustomer from '@/components/AddCustomer.vue'

    export default {
        name: 'Customers',
        components: {
            CustomerList,
            AddCustomer
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