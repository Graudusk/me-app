<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'Me-app',
    data() {
        return {
            user: {
                token: null,
                email: null
            }
        }
    },
    mounted() {
        // this.getMe();
        // console.log(localStorage.getItem('token'));
        this.user.token = localStorage.getItem('token');
        this.user.email = localStorage.getItem('email');
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html {
    font-size: 100%;
    font-family: 'Ubuntu', sans-serif;
}
body {
  background: #222;
}
.app {
    width: 62em;
    margin: 0 auto;
    padding: 2em 6em 8em;
    background-color: #00936f;
    /*border-top: 4px solid #0be6d7;*/
    color: white;
}
h1 {
    font-size: 8em;
    font-weight: 100;
}
h2 {
    font-size: 6em;
    font-weight: 100;
}
p {
    font-size: 1.2em;
    font-weight: normal;
}
.form .form-control {
    padding: 6px 12px;
    border: 2px solid #333;
    border-radius: 5px;
}

.form button {
    padding: 6px 12px;
    border: 2px solid #333;
    border-radius: 5px;
}
</style>
