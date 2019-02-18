<template>
</template>
<script>
export default {
    name: 'Me',
    props: {},
    components: {},
    mounted() {
        // this.getMe();
        // console.log(localStorage.getItem('token'));
        // console.log(this.user);
        this.doLogOut();
    },
    methods: {
        doLogOut() {
            if (localStorage.getItem('token') !== undefined) {
                localStorage.clear();
            }
            this.$router.push('/');
        }
    }
};
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
