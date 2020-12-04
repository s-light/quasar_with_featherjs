<template>
    <q-page class="fit column no-wrap justify-center items-center content-center">
        <section>
            '{{ globalMessage }}'<br>
            '{{ package_selected }}'<br>
            '{{ package_options }}'<br>
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
        <section
        style="
            min-width: 4em;
            min-height: 2em;
            background-color: hsla(230.1, 100%, 50%, 0.05);
            border-radius: 0.5em;
            box-shadow: 0 0 20px hsla(200, 100%, 50%, 0.2);
            margin: 1em;
        "
        >
            <pre
            >{{ messages | pretty }}</pre>
        </section>
        <section>
            <q-input
            filled
            label="Send Message"
            v-model="messagaeToSend"
            @keyup.enter="messageSend()"
            >
            <template v-slot:append>
                <q-icon
                :style="{opacity: (messagaeToSend !== '' ? 'inherit' : '0.1')}"
                name="close"
                @click="messagaeToSend = ''"
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
import { useFind } from 'feathers-vuex'
import { computed } from '@vue/composition-api'
import { mapBind } from '../store/mapBind.js'

export default {
    data () {
        return {
            messagaeToSend: ''
            // messages: [{
            //     text: 'Hello World',
            //     createdAt: '20200101'
            // }]
        }
    },
    computed: {
        connected: function () {
            return api.service('messages').connection.connected
        },
        ...mapBind('appconfig', ['globalMessage', 'package_selected', 'package_options'])
    },
    methods: {
        messageSend: function () {
            console.group('messageSend')
            console.log('TODO: implement sending with featers-vuex')
            // console.log('messagaeToSend', this.messagaeToSend)
            // const serviceMessage = api.service('messages')
            // if (serviceMessage.connection.connected) {
            //     serviceMessage.create({
            //         text: this.messagaeToSend
            //     })
            //     this.messagaeToSend = ''
            //     console.log('send.')
            // } else {
            //     console.log('connection offline.')
            // }
            // console.log('done.', api.service('messages'))
            //
            // $store.dispatch('messages')
            console.groupEnd()
        }
    },
    setup (props, context) {
        const { Message } = context.root.$FeathersVuex.api
        // const { $store } = context.root
        // Messages
        const messagesParams = computed(() => {
            return {
                query: {
                    $sort: { createdAt: 1 },
                    $limit: 25
                }
            }
        })
        const { items: messages } = useFind({
            model: Message,
            params: messagesParams
        })
        return {
            messages
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
    name: 'PageIndex'
}
</script>
