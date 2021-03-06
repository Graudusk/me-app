<template>
    <main>
        <Nav />
        <h1>Chat</h1>
        <div v-if="!nicknameSet">
            <form class="form" @submit.prevent="setNickname">
                <div class="row">
                    <div class="">
                        <input class="form-control" v-model="nickname" type="text" placeholder="Type a nickname" />
                    </div>
                    <div class="">
                        <button class="btn btn-primary">Set</button>
                    </div>
                </div>
            </form>
        </div>
        <div v-else-if="!loading && sessionStarted" id="chat-container" class="card">
            <div class="card-body">
                <div class="container chat-body" ref="chatBody">
                    <div v-for="message in messages" :key="message.id" class="row chat-section">
                        <template v-if="nickname === message.user.nickname">
                            <div class="align-left">
                                <span class="card-text align-left speech-bubble speech-bubble-user subtle-blue-gradient">
                                    {{ message.message }}<br><br>
                                    Sent {{ calculateTime(message.timestamp) }}from {{ message.user.nickname }}
                                </span>
                            </div>
                        </template>
                        <template v-else>
                            <div class="align-right">
                                <span class="card-text align-left speech-bubble speech-bubble-peer">
                                    {{ message.message }}<br><br>
                                    Sent {{ calculateTime(message.timestamp) }}from {{ message.user.nickname }}
                                </span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                <form class="form" @submit.prevent="postMessage">
                    <div class="row">
                        <div class="col-3">
                            <button class="block">Send</button>
                        </div>
                        <div class="col-9">
                            <input class="form-control block" v-model="message" type="text" placeholder="Type a message" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div v-else-if="!loading && !sessionStarted">
            <h3 class="text-center">Welcome {{ nickname }}!</h3>
            <br />
            <button @click="connectToWebSocket" class="control">Start Chatting</button>
        </div>
        <div v-else>
            <div class="loading">
                <h4>Loading...</h4>
            </div>
        </div>
        </div>
        </div>
        </div>
    </main>
</template>
<script>
import Nav from './Nav.vue';
export default {
    components: {
        Nav,
    },
    data() {
        return {
            loading: true,
            messages: [],
            message: '',
            nickname: '',
            nicknameSet: false,
            sessionStarted: false,
        }
    },
    created() {
        this.nickname = localStorage.getItem('nickname')
        if (this.$route.params.uri) {
            this.joinChatSession()
            this.connectToWebSocket()
        }
        setTimeout(() => { this.loading = false }, 2000)
    },
    updated() {
        const chatBody = this.$refs.chatBody
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight
        }
    },
    methods: {
        setNickname() {
            if (this.nickname) {
                this.nicknameSet = true;
                localStorage.setItem("nickname", this.nickname);
            }
        },
        postMessage() {
            if (!this.websocket || this.websocket.readyState === 3) {
                console.log("The websocket is not connected to a server.");
            } else {
                if (this.message) {
                    let now = new Date().getTime()/1000;
                    console.log(this.nickname)
                    let data = {
                        timestamp: Math.round(now),
                        message: this.message,
                        user: {
                            nickname: this.nickname
                        }
                    };
                    this.websocket.send(JSON.stringify(data));
                    fetch("https://me-api.graudusk.me/chat", {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify(data)
                        })
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(result) {
                            console.log(result);
                        })
                        .catch(err => console.log(err));

                    this.messages.push(data);
                    console.log("Sending message: " + this.message);
                    this.message = '';
                }
            }
        },
        connectToWebSocket() {
            this.websocket = new WebSocket('wss://ws.graudusk.me', 'json');
            this.websocket.onopen = this.onOpen;
            this.websocket.onclose = this.onClose;
            this.websocket.onmessage = this.onMessage;
            this.websocket.onerror = this.onError;
            this.sessionStarted = true;
        },
        calculateTime(time) {
            let now = new Date().getTime()/1000;
            time = Math.round(now) - Math.round(time);
            let ret = "";
            if (time > 604800) {
                let weeks = Math.round(time / 604800);
                ret = weeks + " week" + (weeks == 1 ? "" : "s");
            } else if (time > 86400) {
                let days = Math.round(time / 86400);
                ret = days + " day" + (days == 1 ? "" : "s");
            } else if (time > 3600) {
                let hours = Math.round(time / 3600);
                ret = hours + " hour" + (hours == 1 ? "" : "s");
            } else if (time > 60) {
                let minutes = Math.round(time / 60);
                ret = minutes + " minute" + (minutes == 1 ? "" : "s");
            } else if (time > 1) {
                ret = time + " second" + (time == 1 ? "" : "s");
            } else {
                ret = "just now ";
            }

            if (ret !== "just now ") {
                ret += " ago ";
            }
            return ret;
        },
        onOpen(event) {
            let that = this;
            console.log("The websocket is now open.");
            console.log(this.websocket);
            fetch("https://me-api.graudusk.me/chat")
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    console.log(result);
                    // this.messages.push(data);
                    that.messages = result;
                })
                .catch(err => console.log(err));
        },
        onClose(event) {
            console.log('Connection closed.');
            // Try and Reconnect after five seconds
            setTimeout(this.connectToWebSocket, 5000);
        },
        onMessage(event) {
            console.log(event);
            const message = JSON.parse(event.data);
            this.messages.push(message);
            if (!document.hasFocus()) {
                // this.notification.play()
            }
        },
        onError(event) {
            console.log('An error occured:', event)
        }
    }
};
</script>
<style scoped>

#chat-container {
    width: 400px;
}

.loading {
    text-align: center;
    margin-top: 150px;
}

.btn {
    border-radius: 0 !important;
}

/*.card-footer input[type="text"] {
    background-color: #ffffff;
    color: #444444;
    padding: 7px;
    font-size: 13px;
    border: 2px solid #cccccc;
    width: 100%;
    height: 38px;
}*/

.card-header a {
    text-decoration: underline;
}

.card-body {
    background-color: #078969;
    box-shadow: #3336 1px 1px 3px inset;
}

.chat-body {
    height: 380px;
    overflow-y: auto;
}

.speech-bubble {
    display: inline-block;
    position: relative;
    border-radius: 0.4em;
    padding: 10px;
    background-color: #009350;
    background: linear-gradient(45deg, #009350, #26b372);
    font-size: 14px;
    margin: 0 15px;
}

.subtle-blue-gradient {
    background: linear-gradient(45deg, #004bff, #007bff);
}


.chat-section:first-child {
    margin-top: 10px;
}

.chat-section:last-child {
    margin-bottom: 15px;
}

.chat-section {
    margin-top: 15px;
}

.send-section {
    margin-bottom: -20px;
    padding-bottom: 10px;
}



.col-3 {
    float:left;
    width: 25%;
}
.col-6 {
    float:left;
    width: 50%;
}
.col-9 {
    float:left;
    width: 75%;
}
</style>
