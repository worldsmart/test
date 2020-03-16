<template>
    <div class="navbar">
        <v-app-bar>
            <v-container>
                <v-row align="center" justify="center">
                    <div class="my-2 link">
                        <router-link :class="$route.path == '/' ? 'active' : ''" to="/" tag="div">Home</router-link>
                    </div>
                    |
                    <div class="my-2 link">
                        <router-link :class="$route.path == '/login' ? 'active' : ''" :to="'/login'" tag="div">Login</router-link>
                    </div>
                    |
                    <div class="my-2 link">
                        <router-link :class="$route.path == '/customers' ? 'active' : ''" :to="'/customers'" tag="div">Customers</router-link>
                    </div>
                    |
                    <div class="my-2 link">
                        <router-link :class="$route.path == '/clientss' ? 'active' : ''" :to="'/clients'" tag="div">Clients</router-link>
                    </div>
                </v-row>
            </v-container>
        </v-app-bar>
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
            color: white;
        }
    }
</style>

<script>
    export default {
        name: 'Nav',
        data: () => ({

        }),
    };
</script>