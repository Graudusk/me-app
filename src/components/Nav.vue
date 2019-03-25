<template>
    <nav>
        <ul>
            <li>
                <router-link to="/">Me</router-link>
            </li>
            <li>
                <router-link to="/chat">Chat</router-link>
            </li>
            <li>
                <router-link to="/report/kmom01">kmom01</router-link>
            </li>
            <li>
                <router-link to="/report/kmom02">kmom02</router-link>
            </li>
            <li>
                <router-link to="/report/kmom03">kmom03</router-link>
            </li>
            <li>
                <router-link to="/report/kmom04">kmom04</router-link>
            </li>
            <li>
                <router-link to="/report/kmom05">kmom05</router-link>
            </li>
            <li>
                <router-link to="/report/kmom06">kmom06</router-link>
            </li>
            <li v-if="this.user.token">
                <router-link to="/write">Write</router-link>
            </li>
            <li v-if="this.user.token == undefined">
                <router-link to="/login">Login</router-link>
            </li>
            <li v-else="">
                <!-- Logged in as {{ this.user.email }} -->
                <router-link to="/logout">Logout</router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name: 'Me',
    props: {},

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
        // console.log(this.user.token);
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    text-align: center;
    list-style-type: none;
}

li {
    display: inline;
    margin-right: 1em;
}

li a {
    text-decoration: none;
    color: white;
    font-size: 1.4em;
}

li a:hover {
    text-decoration: underline;
}
</style>
