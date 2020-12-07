<template>
    <q-page class="fit column no-wrap justify-center items-center content-center">
        <section>
            '{{ globalMessage }}'<br>
            '{{ package_selected }}'<br>
            '{{ package_options }}'<br>
        </section>
        <section>
            <ul>
                <li v-for="entry in myObjectList" :key="entry._id">
                    {{ entry.name }}: {{ entry.value }} <br>
                    {{ entry.description }}
                </li>
            </ul>
        </section>
        <section class="q-pa-md row justify-center">
            <div style="width: 100%; max-width: 400px">
                <q-chat-message
                v-for="msg in messages"
                :key="msg.id"
                :text="[msg.text]"
                :stamp="msg.createdAt | prettyDateTime"
                />
            </div>
        </section>
        <!-- <section
            style="
            min-width: 4em;
            min-height: 2em;
            background-color: hsla(230.1, 100%, 50%, 0.05);
            border-radius: 0.5em;
            box-shadow: 0 0 20px hsla(200, 100%, 50%, 0.2);
            margin: 1em;
            font-size: 0.6em;
            "
        >
            <pre>{{ messages | pretty }}</pre>
        </section> -->
        <section>
            <q-input
            filled
            label="Send Message"
            v-model="messageText"
            @keyup.enter="messageSend()"
            >
                <template v-slot:append>
                    <q-icon
                    :style="{opacity: (messageText !== '' ? 'inherit' : '0.1')}"
                    name="close"
                    @click="messageText = ''"
                    class="cursor-pointer"
                    />
                </template>
                <template v-slot:after>
                    <q-btn
                    round
                    v-ripple
                    dense
                    flat
                    icon="send"
                    :disable="!connected"
                    @click="messageSend()"
                    />
                </template>
            </q-input>
        </section>
    </q-page>
</template>

<script>
import { date } from 'quasar'
// import { ref } from '@vue/composition-api'
// import { computed } from '@vue/composition-api'
import { makeFindMixin } from 'feathers-vuex'
// import { useFind } from 'feathers-vuex'
import { mapBind } from '../store/mapBind.js'

export default {
    data () {
        return {
            messageText: ''
            // messages: [{
            //     text: 'Hello World',
            //     createdAt: '20200101'
            // }]
        }
    },
    mixins: [
        makeFindMixin({ service: 'messages' }),
        makeFindMixin({ service: 'my-object-list' })
    ],
    computed: {
        connected: function () {
            console.log('computed: connected this', this)
            // return api.service('messages').connection.connected
            return true
        },
        ...mapBind('appconfig', ['globalMessage', 'package_selected', 'package_options']),
        // ...mapBind('globalconfig', ['gInfo', 'weight_current'])
        messagesParams () {
            return { query: {} }
        },
        myObjectListParams () {
            return { query: {} }
        }
    },
    methods: {
        messageSend: function () {
            // console.group('messageSend')
            // console.log('messageText', this.messageText)
            // console.log('messageSend this', this)
            // console.log('this.messages', this.messages)
            // console.log('this.$store', this.$store)

            // this does not work:
            // the computed messages prooertie has no setter
            // this.messages = this.messages.concat(this.messageText)

            const { Message } = this.$FeathersVuex.api
            const message = new Message({ text: this.messageText })
            message.save()
            // console.log('message', message)

            // console.groupEnd()
        }
    },
    filters: {
        pretty: function (value) {
            let valueJson = value
            try {
                valueJson = JSON.parse(value)
            } catch (e) {
                // console.log(value, e)
            }
            return JSON.stringify(valueJson, null, 4)
        },
        prettyDateTime: function (value) {
            return date.formatDate(value, 'HH:mm DD.MM.YYYY')
        }
    },
    name: 'PageExtended'
}
</script>
