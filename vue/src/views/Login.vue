<template>
    <div class="login_form">
        <v-card
    class="mx-auto"
    max-width="344"
    outlined
    :loading='loading'
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Login</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-list-item three-line>
      <v-text-field
                    v-model="login"
                    label="Login"
                    required
            ></v-text-field>
    </v-list-item>

    <v-list-item three-line>
      <v-text-field
                    v-model="password"
                    label="Password"
                    required
                    type="password"
            ></v-text-field>
    </v-list-item>

    <v-list-item three-line>
      <v-btn class="mr-4" @click="submit">submit</v-btn>
    </v-list-item>

  </v-card>

        <v-snackbar color="success" top right v-model="snackbar.success" :timeout="2000">
            You are successfully loged in
        </v-snackbar>
        <v-snackbar color="error" top right v-model="snackbar.err" :timeout="2000">
            {{snackbar.err_text}}
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return {
                login: '',
                password: '',
                loading: false,
                snackbar:{
                    success: false,
                    err: false,
                    err_text: '' 
                }
            }
        },
        methods: {
            submit: function () {
                this.loading = true;
                this.$http.put('/api/login', {
                    login: this.login,
                    password: this.password
                }).then((res) => {
                    this.loading = false;
                    this.snackbar.success = true;
                    localStorage.setItem('jwt', res.body.jwt);
                    this.$store.state.user.name = res.user;
                    this.$store.state.user.login = res.login;
                    window.location.replace('/');
                }, (err) => {
                    this.loading = false;
                    this.snackbar.err = true;
                    this.snackbar.err_text = err.body;
                    console.log(err);
                });
            }
        }
    }
</script>

<style lang="scss">
    .login_form{
        width: 600px;
        margin: auto;
    }
</style>