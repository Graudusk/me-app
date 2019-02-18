<template>
    <main>
        <Nav />
        <h1>Login</h1>
        <div class="form">
            <input class="form-control" name="email" type="email" v-model="email" placeholder="Your email goes here">
            <input class="form-control" name="password" type="password" v-model="password" placeholder="Type your password">
            <button id="loginBtn" v-on:click="doLogin">Login</button>
        </div>
        <!-- <p>{{ error }}</p> -->
    </main>
</template>
<script>
import Nav from './Nav.vue';
export default {
    name: 'Me',
    props: {},
    components: {
        Nav,
    },
    data() {
        return {
            email: '',
            password: '',
            user: ''
        };
    },
    mounted() {
        // this.getMe();
        // console.log(localStorage.getItem('token'));
        // console.log(this.user);
    },
    methods: {
        doLogin: function(event) {
            // `this` inside methods points to the Vue instance
            // alert('Hello ' + this.email + '!');
            let userData = {
                email: this.email,
                password: this.password
            };
            this.errors = null;
            // `event` is the native DOM event
            let that = this;
            if (event) {
                // let formData = new FormData(this.el);
                // console.log(userData);
                fetch('https://me-api.graudusk.me/login', {
                // fetch('http://localhost:1337/login', {
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        // body: formData
                        body: JSON.stringify(userData)
                    })
                // fetch('https://me-api.graudusk.me/login', { method: 'POST', body: JSON.stringify(userData) })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(result) {
                        // eslint-disable-next-line
                        // console.log(result.errors.detail);
                        // console.log(this.router);
                        localStorage.setItem('token', result.data.token);
                        localStorage.setItem('email', result.data.user.email);
                        // router.go('/');
                        // if (result.status == 200) {
                        that.$router.push('/');
                        // }
                    });
                // console.log(this.$http.post('https://me-api.graudusk.me/login', JSON.stringify(this.user)));
            }
        },
        getMe() {
            // let that = this;
            // fetch('https://me-api.graudusk.me');
            // .then(function(response) {
            //     return response.json();
            // })
            // .then(function(result) {
            //     // eslint-disable-next-line
            //     console.log(result);
            //     that.text = result.description;
            // });
        }
    }
};
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
