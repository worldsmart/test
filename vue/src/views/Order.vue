<template>
    <div class="table">
        <v-progress-linear v-if="!order.id" indeterminate color="cyan"></v-progress-linear>
        <v-card v-if="order.id" class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Order №{{order.id}}</v-list-item-title>
                    <div class="form">
                        <div class="text--primary">Name: {{order.name}}</div>
                        <div class="text--primary">Customer code: {{order.customer_code ? order.customer_code : '-'}}</div>
                        <div class="text--primary">Debtor Number: {{order.debtorNr ? order.debtorNr : '-'}}</div>
                        <div class="text--primary">Date: {{order.date}}</div>
                        <div class="text--primary">Units: {{order.units ? order.units : '-'}}</div>
                        <div class="text--primary">Weight: {{order.weight ? order.weight : '-'}}</div>
                        <div class="text--primary">Volume: {{order.volume ? order.volume : '-'}}</div>
                        <div class="text--primary">Load meters: {{order.load_meters ? order.load_meters : '-'}}</div>
                        <div class="text--primary">Description: {{order.description ? order.description : 'No description'}}</div>
                        <div class="text--primary">Order type: {{order.order_type ? order.order_type : '-'}}</div>
                        <div class="text--primary">Transport type: {{order.transport_type ? order.transport_type : '-'}}</div>
                        <div class="text--primary">Plangroup: {{order.plangroup ? order.plangroup : '-'}}</div>
                        <div class="text--primary">Cargoline: {{order.cargo ? order.cargo : '-'}}</div>
                        <div class="text--primary">Reuse address: {{order.reuse_address ? order.reuse_address : 'No'}}</div>
                        <div class="text--primary">Source: {{order.source ? order.source : 'No'}}</div>
                    </div>

                    <div v-for="item in order.activities" :key="item.id" class="form">
                        <v-card class="mx-auto" outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline mb-1">Activity</v-list-item-title>
                                    <div class="text--primary">ID: {{item.id}}</div>
                                    <div class="text--primary">Name: {{item.name}}</div>
                                    <div class="text--primary">Type: {{item.type}}</div>
                                    <div class="text--primary">Contact phone: {{item.phone}}</div>
                                    <div class="text--primary">Contact person: {{item.contact_person}}</div>
                                    <div class="text--primary">Remarks: {{item.remarks}}</div>
                                    <div class="text--primary">Date: {{item.date}}</div>
                                    <div class="text--primary">Date from: {{item.date_from}}</div>
                                    <div class="text--primary">Date until: {{item.date_until}}</div>
                                    <div class="text--primary">Time from: {{item.time_from}}</div>
                                    <div class="text--primary">Time till: {{item.time_till}}</div>
                                    <div class="text--primary">Sequence: {{item.sequence}}</div>
                                    <div class="text--primary">Shipment ID: {{order.shipment_id}}</div>

                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-list-item-title class="headline mb-1">Address</v-list-item-title>
                                            <div class="text--primary">Country: {{item.address.country.name}}</div>
                                            <div class="text--primary">City: {{item.address.city}}</div>
                                            <div class="text--primary">Street: {{item.address.street}}</div>
                                            <div class="text--primary">House number: {{item.address.house_number}}</div>
                                            <div class="text--primary">Zip code: {{item.address.zip_code}}</div>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </div>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'OrderList',
        props: ['id'],
        data(){
            return{
                order: {}
            }
        },
        methods: {

        },
        created: function(){
            this.$http.get('/api/order?id=' + this.id, {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }).then((res) => {
                this.order = res.body.order;
            }, (err) => {
                console.log(err);
            });
        }
    }
</script>

<style lang="scss">
    .form{
        margin: 9px;
    }
</style>