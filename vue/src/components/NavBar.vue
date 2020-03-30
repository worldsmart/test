<template>
    <div class="navbar">
        <v-app-bar>
            <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title>MDC</v-toolbar-title>
        </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon>account_circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
              <v-list-item-subtitle>Login: {{user.login}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>param</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click='logout'>
            <v-list-item-icon>
              <v-icon>power_settings_new</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title >Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

        <v-tabs v-if="location != '/login'" background-color="grey darken-4" color="">
            <v-tab to="/">
                Home
            </v-tab>
            <v-tab to="/customers">
                Customers
            </v-tab>
            <v-tab to="/clients">
                Clients
            </v-tab>
            <v-tab to="/timers">
                Timers
            </v-tab>
            <!--<v-tab to="/orders">
                Orders
            </v-tab>
            <v-tab to="/zones">
                Zones
            </v-tab>-->
        </v-tabs>

    </div>
</template>

<style lang="scss">
    .navbar{
        margin-bottom: 20px;
    }
</style>

<script>
    export default {
        name: 'Nav',
        data: function () {
            return {
                location: window.location.pathname,
                drawer: false
            }
        },
        computed:{
            user(){
                return this.$store.state.user
            },
        },
        methods:{
            logout: function(){
                localStorage.removeItem('jwt');
                window.location.reload();
            },
            openDrawer: function(){
                if(localStorage.getItem('jwt') && this.$store.state.user.name){
                    this.drawer = true;
                }
            }
        }
    };
</script>