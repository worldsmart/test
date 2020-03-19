<template>
    <div class="form">
        <v-card class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Customer options</v-list-item-title>
                    <v-text-field v-model="customer.name" label="Customer name" hide-details="auto"></v-text-field>
                    <v-text-field v-model="customer.slim_organisation_id" label="Slim ID" hide-details="auto"></v-text-field>
                    <v-switch v-model="customer.active" label="Active"></v-switch>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-btn class="mr-4" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar" :timeout="2000">
            Customer was updated
        </v-snackbar>
    </div>
</template>

<script>

    export default {
        name: 'CustomerOptions',
        props: ['customer'],
        components: {

        },
        data(){
            return{
                snackbar: false
            }
        },
        methods: {
            save: function () {
                this.$http.put('/api/customer?id=' + this.customer.id, {
                    name:  this.customer.name,
                    slim_id:  this.customer.slim_organisation_id,
                    active:  this.customer.active
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then(() => {
                    this.snackbar = true;
                }, (err) => {
                    console.log(err);
                });
            }
        },
        created: function(){

        }
    }
</script>

<style lang="scss">
    .form{
        margin: 20px 40px;
    }
</style>