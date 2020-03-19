<template>
    <div class="login_form">
        <form>
            <v-text-field
                    v-model="login"
                    label="Login"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="password"
                    label="Password"
                    required
                    type="password"
            ></v-text-field>

            <v-btn class="mr-4" @click="submit">submit</v-btn>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return {
                login: '',
                password: ''
            }
        },
        methods: {
            submit: function () {
                this.$http.put('/api/login', {
                    login: this.login,
                    password: this.password
                }).then((res) => {
                    console.log(res);
                    localStorage.setItem('jwt', res.body.jwt);
                    location.replace('/home');
                }, (err) => {
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
        padding: 20px;
        box-shadow: -1px 1px 3px 2px gray;
    }
</style>