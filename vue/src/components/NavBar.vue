<template>
    <div class="navbar">
        <v-app-bar color="grey darken-4" dense>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>MDK</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

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
            <v-tab to="/orders">
                Orders
            </v-tab>
            <v-tab to="/zones">
                Zones
            </v-tab>
        </v-tabs>

    </div>
</template>

<style lang="scss">
    .navbar{
        margin-bottom: 20px;
    }
    .link{
        padding: 10px;
        div{
            color:red;
            font-weight: bold;
            padding: 4px 10px;
            cursor: pointer;
            border-radius: 2px;
        }
        div:hover{
            color: white;
        }
        .active{
            color: red;
        }
    }
</style>

<script>
    export default {
        name: 'Nav',
        data: function () {
            return {
                location: window.location.pathname
            }
        },
    };
</script>