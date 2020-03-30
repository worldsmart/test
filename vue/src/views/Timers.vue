<template>
    <div style="margin: 10px 10px auto 10px">
        <v-progress-linear
                v-if="loading"
                indeterminate
                color="cyan"
        ></v-progress-linear>
        <div v-if="!loading">
            <v-card class="mx-auto card add_button" outlined v-on="on">
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Add new cron</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                    <v-text-field v-model="timer.name" label="Name" hide-details="auto"></v-text-field>
                </v-list-item>
                <v-list-item two-line>
                    <v-select v-model="timer.action" :items="['Parse from FTP', 'Parse from FTP']" label="Action"></v-select>
                </v-list-item>
                <v-list-item two-line>
                    <v-select v-model="timer.time" :items="['Day','Hour','Minute']" label="Run every:"></v-select>
                </v-list-item>
                <v-list-item v-if="timer.time == 'Day'" two-line>
                    <v-text-field v-model="timer.hour" label="Hour(1-24)" hide-details="auto"></v-text-field>
                </v-list-item>
                <v-list-item three-line>
                    <v-btn @click="add">Add</v-btn>
                </v-list-item>
            </v-card>
            <v-toolbar v-for="item in timers" :key="item.name" style="margin: 10px">
                Timer:
                <v-chip class="ma-2" label>Name: {{item.name}} </v-chip>
                <v-chip class="ma-2" label>Action: {{item.action}}</v-chip>
                <v-chip class="ma-2" label>Run every: {{item.time}}</v-chip>
                <v-chip v-if="item.hour" class="ma-2" label>Every {{item.hour}}`th hour</v-chip>
                <v-btn @click="del(item.name)">Delete</v-btn>
            </v-toolbar>
        </div>

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            Operation done successfully
        </v-snackbar>
        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            {{snackbar.err_text}}
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'Timers',
        props: [],
        data(){
            return{
                timers: {},
                loading: true,
                timer:{
                    name: '',
                    action: 'Parse from FTP',
                    time: '',
                    hour: ''
                },
                snackbar:{
                    success: false,
                    err: false,
                    err_text: ''
                }
            }
        },
        methods: {
            add: function () {
                this.$http.put('/api/timer', this.timer, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    this.snackbar.success = true;
                    this.timers[res.body.timer.name] = res.body.timer;
                    this.timer = {
                        name: '',
                        action: 'Parse from FTP',
                        time: '',
                        hour: ''
                    };
                }, (err) => {
                    console.log(err)
                    this.snackbar.err = true;
                    this.snackbar.err_text = err.body;
                });
            },
            del: function (name) {
                this.$http.delete('/api/timer?name=' + name, {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then(() => {
                    delete this.timers[name];
                    this.snackbar.success = true;
                }, (err) => {
                    this.snackbar.err = true;
                    this.snackbar.err_text = err.body;
                });
            }
        },
        created: function(){
            this.$http.get('/api/timer', {
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }).then((res) => {
                this.timers = res.body.timers;
                console.log(res.body);
                this.loading = false;
            }, (err) => {
                console.log(err);
            });
        }
    }
</script>

<style lang="scss">

</style>