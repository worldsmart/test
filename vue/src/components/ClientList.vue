<template>
    <div>
        <v-card color="grey darken-3">
            <v-card-title>
                Clients
                <v-spacer></v-spacer>
                <v-text-field v-model="search_string" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>

            <v-data-table background-color="blue-grey darken-3" dense :headers="headers" :items="clients" :search="search_string">
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="goToClient(item.id)">account_box</v-icon>
                    <v-icon small @click="deleteClient(item.id)">mdi-delete</v-icon>
                </template>
                <template v-slot:item.ftp_setting="{ item }">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on" small class="mr-2">insert_drive_file</v-icon>
                        </template>
                        <div>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>

                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>id:</td>
                                        <td>{{ item.ftp_setting.id }}</td>
                                    </tr>
                                    <tr>
                                        <td>name:</td>
                                        <td>{{ item.ftp_setting.name }}</td>
                                    </tr>
                                    <tr>
                                        <td>host:</td>
                                        <td>{{ item.ftp_setting.host }}</td>
                                    </tr>
                                    <tr>
                                        <td>port:</td>
                                        <td>{{ item.ftp_setting.port }}</td>
                                    </tr>
                                    <tr>
                                        <td>user:</td>
                                        <td>{{ item.ftp_setting.user }}</td>
                                    </tr>
                                    <tr>
                                        <td>password:</td>
                                        <td>{{ item.ftp_setting.password }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </div>
                    </v-menu>
                </template>
            </v-data-table>
        </v-card>

        <v-snackbar color="success" top right v-model="snackbar" :timeout="2000">
            Client was deleted
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'ClientList',
        props: ['id', 'clients'],
        data(){
            return{
                search_string: '',
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
                        text: 'Sync',
                        value: 'sync'
                    },
                    {
                        text: 'FTP',
                        value: 'ftp_setting'
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
                this.display_clients = this.clients.filter((client)=>{
                    return !client.name.indexOf(this.search_string);
                });
            },
            goToClient: function (id) {
                this.$router.push({ path: '/client', query: { id: id} })
            },
            deleteClient: function (id) {
                if (window.confirm("Do you really want to delete client? id=" + id)) {
                    this.$http.delete('/api/client?id=' + id, {
                        headers: {
                            Authorization: localStorage.getItem('jwt')
                        }
                    }).then((res) => {
                        console.log(res);
                        this.snackbar = true;
                        this.clients = this.clients.filter(client=>{
                            return client.id == id ? false : true;
                        });
                    }, (err) => {
                        console.log(err.bodyText);
                    });
                }
            }
        },
        created: function(){
            if(!this.id){
                this.$http.get('/api/client', {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    console.log(res);
                    this.clients = res.body.clients;
                    this.display_clients = this.clients;
                }, (err) => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style lang="scss">
    .menu{
        margin: 10px;
    }
    .inspect{
        margin: 4px 0;
    }
</style>