<template>
    <q-page class="flex flex-center">
        <div class="">
            '{{ messages }}'
        </div>
    </q-page>
</template>

<script>
import api from '../api'

const messages = api.service('messages')
// Listen to user events
messages.on('created', user => {
    this.$data.messages = this.$data.messages.concat(user)
})

export default {
    data () {
        return {
            messages: ['Hello World']
        }
    },
    name: 'PageIndex'
}
</script>
