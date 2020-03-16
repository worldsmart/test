<template>
    <div class="table">
        <v-text-field v-model="search_string" @input="search" label="Search"></v-text-field>
        <v-progress-linear
                v-if="loading"
                indeterminate
                color="cyan"
        ></v-progress-linear>
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Slim ID</th>
                    <th class="text-left">Active</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in display_customers" :key="item.id" @click="goToCustomer(item.id)">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.slim_organisation_id }}</td>
                    <td>{{ item.active }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
    export default {
        name: 'CustomerList',
        data(){
            return{
                customers: [],
                search_string: '',
                display_customers: [],
                loading: true
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