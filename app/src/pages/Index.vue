<template>
    <q-page class="fit column no-wrap justify-center items-center content-center">
        <section>
            <pre>{{ messages | pretty }}</pre>
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
import api from '../api'

export default {
    data () {
        return {
            messagaeToSend: '',
            messages: ['Hello World']
        }
    },
    computed: {
        connected: function () {
            return api.service('messages').connection.connected
        }
    },
    methods: {
        messageSend: function () {
            console.group('messageSend')
            console.log('messagaeToSend', this.messagaeToSend)
            const serviceMessage = api.service('messages')
            if (serviceMessage.connection.connected) {
                serviceMessage.create({
                    text: this.messagaeToSend
                })
                this.messagaeToSend = ''
                console.log('send.')
            } else {
                console.log('connection offline.')
            }
            // console.log('done.', api.service('messages'))
            console.groupEnd()
        }
    },
    mounted: function () {
        console.log('PageIndex mounted.')
        const messagesService = api.service('messages')
        // console.log('messagesService', messagesService)
        // Listen to message events
        messagesService.on('created', messagesNew => {
            console.log('message created', this.messages)
            this.messages = this.messages.concat(messagesNew)
        })
        // init from server
        // this.messages = await app.service('messages').find()
        messagesService.find().then(function (value) {
            console.log('messageService.find then', value)
            // this.messages = await app.service('messages').find()
        }).catch(function (error) {
            console.log('messageService.find catch', error)
        })
        // console.log('messageService.find', messagesService.find())
        // api.io.on('disconnect', (reason) => {
        //     console.log('messageService disconnect')
        // })
        // api.io.on('connected', () => {
        //     console.log('messageService connected.')
        // })
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
        }
    },
    name: 'PageIndex'
}
</script>
