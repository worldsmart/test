<template>
    <div>
        <v-tabs class="elevation-2">
            <v-tabs-slider></v-tabs-slider>
            <v-tab>
                List
            </v-tab>
            <v-tab>
                Add customer
            </v-tab>

            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <CustomerList></CustomerList>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat tile>
                    <v-card-text class="text--primary">
                        <AddCustomer></AddCustomer>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
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