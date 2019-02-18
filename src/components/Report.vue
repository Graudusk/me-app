<template>
    <main>
        <Nav />
        <h2>{{ $route.params.kmom }}</h2>
        <div class='question' v-for='question in questions' :key='question.key'>
            <p><strong>{{ question.question }}</strong></p>
            <p>{{ question.answer }}</p>
        </div>
    </main>
</template>
<script>
import Nav from './Nav.vue';
export default {
    name: 'Report',
    components: {
        Nav,
    },
    data() {
        return {
            questions: [],
        }
    },
    watch: {
        '$route'(to, from) {
            // react to route changes...
            this.getText(this.$route.params.kmom);
        }
    },
    mounted() {
        this.getText(this.$route.params.kmom);
    },
    methods: {
        getText(kmom) {
            let that = this;
            that.questions = [];
            // fetch('http://localhost:1337/reports/' + kmom)
            fetch('https://me-api.graudusk.me/reports/' + kmom)
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    // eslint-disable-next-line
                    if (result.data) {
                        that.questions = result.data.map((question, index) => {
                            return {
                                key: index,
                                question: question.question,
                                answer: question.answer
                            };
                        });
                    } else {
                        this.$router.push('/');
                    }
                });
        }
    }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h2 {
    text-transform: uppercase;
}

.question {
    margin-bottom: 2em;
}
</style>
