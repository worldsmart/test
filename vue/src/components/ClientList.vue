<template>
    <div>
        <v-text-field v-model="search_string" @input="search" label="Search"></v-text-field>
        <div v-if="!clients[0]">
            This customer hasn`t clients yet
        </div>
        <v-simple-table v-if="clients[0]" dense>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Sync</th>
                    <th class="text-left">Ftp options</th>
                    <th class="text-left"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in display_clients" :key="item.id" >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.sync }}</td>
                    <td>
                        <v-menu>
                            <template v-slot:activator="{ on }">
                                <div v-on="on" class="inspect"><v-btn small>Inspect</v-btn></div>
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
                    </td>
                    <td><v-btn @click="$router.push({ path: '/client', query: { id: item.id} })" small>Full profile</v-btn></td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
    export default {
        name: 'ClientList',
        props: ['id', 'clients'],
        data(){
            return{
                search_string: '',
                display_clients: this.clients
            }
        },
        methods: {
            search(){
                this.display_clients = this.clients.filter((client)=>{
                    return !client.name.indexOf(this.search_string);
                });
            },
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