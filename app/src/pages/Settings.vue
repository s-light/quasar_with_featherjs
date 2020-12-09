<template>
    <q-page class="fit column no-wrap justify-center items-center content-center">
        <h1>Global Settings</h1>
        <debugSection label="globalConfig" :obj="globalConfig"/>
        <debugSection label="serialDevice" :obj="serialDevice"/>
        <debugSection label="btnSpace" :obj="btnSpace"/>
        <section>
            <q-btn
                round
                :color="$q.dark.isActive ? 'blue' : 'black'"
                icon="mdi-lightbulb-on-outline"
                @click="$q.dark.toggle()"
            />
        </section>
        <section>
            <q-btn
                v-ripple
                label="load db from server"
                icon="sync"
                @click="globalConfigLoadFromServer()"
            />
        </section>
        <section>
            <q-input
                filled
                label="serial device"
                v-model="serialDevice"
                debounce="500"
            >
                <template v-slot:append>
                    <q-icon
                        :style="{opacity: (serialDevice !== '' ? 'inherit' : '0.1')}"
                        name="close"
                        @click="serialDevice = '/dev/ttyUSB0'"
                        class="cursor-pointer"
                    />
                </template>
            </q-input>

            <q-input
                filled
                label="pos"
                type="number"
                v-model.number="pos"
                debounce="500"
            />
            <q-input
                filled
                label="button size (mm)"
                type="number"
                v-model.number="btnSize"
                debounce="500"
            />
            <q-input
                filled
                label="button spaceing (mm)"
                type="number"
                v-model.number="btnSpace"
                debounce="500"
            />
            <!-- <q-slider
                v-model="pos"
                :min="-20"
                :max="20"
                :step="2"
                debounce="1000"
                label
                label-always
                color="purple"
             /> -->
        </section>
    </q-page>
</template>

<script>
import { mapBindIDItems } from '../store/mapBindIDItems.js'
import DebugSection from 'components/debugSection'

export default {
    data () {
        return {
            // testthing: {
            //     value: '/dev/ttyUSB42',
            //     message: 'Hello World'
            // }
        }
    },
    components: { DebugSection },
    computed: {
        ...mapBindIDItems('global-config', ['serialDevice', 'pos', 'btnSize', 'btnSpace'])
    },
    methods: {
        globalConfigLoadFromServer: function () {
            console.log('TODO: implement load from server')
            this.$axios.get('/config/global-config.json')
                .then((response) => {
                    // this.data = response.data
                    console.log('response.data', response.data)
                    this.$q.notify({
                        color: 'info',
                        message: 'Loaded config from server. Processing now.',
                        icon: 'info'
                    })

                    this.$q.notify({
                        color: 'negative',
                        message: 'TODO: Please Implement this!',
                        icon: 'info'
                    })

                    this.$q.notify({
                        color: 'positive',
                        message: 'done.',
                        icon: 'info'
                    })
                })
                .catch(() => {
                    this.$q.notify({
                        color: 'negative',
                        message: 'Loading failed',
                        icon: 'report_problem'
                    })
                })
        }
    },
    created: function () {
        // return mapBindIDItems('global-config', ['serialDevice', 'pos', 'btnSize', 'btnSpace'])
    },
    name: 'PageSettings'
}
</script>
