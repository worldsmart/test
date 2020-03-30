<template>
    <div class="form">
        <v-card :loading='loading' class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Customer options</v-list-item-title>
                    <div>
                        <v-text-field v-model="customer.name" label="Customer name" hide-details="auto"></v-text-field>
                    </div>
                    <div>
                        <v-text-field v-model="customer.slim_organisation_id" label="Slim ID" hide-details="auto"></v-text-field>
                    </div>
                    <v-switch v-model="customer.active" label="Active"></v-switch>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-btn class="mr-4" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            Customer was updated
        </v-snackbar>
        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            {{snackbar.err_text}}
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
                snackbar: {
                    success: false,
                    err: false,
                    err_text: ''
                },
                loading: false
            }
        },
        methods: {
            save: function () {
                this.loading = true;
                this.$http.put('/api/customer?id=' + this.customer.id, {
                    name:  this.customer.name,
                    slim_id:  this.customer.slim_organisation_id,
                    active:  this.customer.active
                }, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then(() => {
                    this.snackbar.success = true;
                    this.loading = false;
                }, (err) => {
                    this.snackbar.err = true;
                    this.snackbar.err_text = err.body;
                    this.loading = false;
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