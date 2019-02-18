<template>
    <main>
        <Nav />
        <h1>Write report</h1>
        <form class="form">
            <p>
                Write reports in the following pattern:
            </p>
            <p>
                <code>
{
    "question":"QUESTION TEXT",
    "answer":"ANSWER TEXT"
},
{
    "question":"QUESTION TEXT",
    "answer":"ANSWER TEXT"
}
                </code>
            </p>
            <p>
                <input class='form-control' type='text' v-model='title' placeholder='Report title'>
            </p>
            <p>
                <textarea class='form-control' v-model='data' placeholder='Type your report text'></textarea>
            </p>
            <button v-on:click='doWrite'>Post</button>
        </form>
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
            title: '',
            data: '',
            token: ''
        }
    },
    mounted() {
        // this.getMe();
        // console.log(localStorage.getItem('token'));
        // console.log(this.user);
    },
    methods: {
        doWrite: function(event) {
            // let textData = this.data.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
            let textData = this.data.replace(/(\'\r\n|\n|\r)/gm, "")
            let reportData = {
                title: this.title,
                data: '{"data":[' + textData + ']}'
                // data: '{"data":[' + textData.replace(/(\')/g, "") + ']}'
            };
            // reportData = JSON.stringify(reportData);

            // let myEscapedJSONString = reportData.replace(/\\n/g, "\\n")
            //                                     .replace(/\\'/g, "\\'")
            //                                     .replace(/\\"/g, '\\"')
            //                                     .replace(/\\&/g, "\\&")
            //                                     .replace(/\\r/g, "\\r")
            //                                     .replace(/\\t/g, "\\t")
            //                                     .replace(/\\b/g, "\\b")
            //                                     .replace(/\\f/g, "\\f");

            // console.log(myEscapedJSONString);
            // `event` is the native DOM event
            let that = this;
            if (event) {
                // let formData = new FormData(this.el);
                // console.log(reportData);
                // fetch('http://localhost:1337/reports', {
                fetch('https://me-api.graudusk.me/reports', {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': localStorage.getItem('token')
                        },
                        method: 'POST',
                        // body: formData
                        // body: myEscapedJSONString
                        body: JSON.stringify(reportData)
                    })
                // fetch('https://me-api.graudusk.me/login', { method: 'POST', body: JSON.stringify(userData) })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(result) {
                        // eslint-disable-next-line
                        that.$router.push('/');
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
code {
    margin: 12px 0;
    padding: 12px;
    display: block;
    white-space: pre;
    background: #111;
    color: lime;
    border: 2px solid #333;
}

textarea {
    width: 100%;
    min-height: 200px;
}
</style>
