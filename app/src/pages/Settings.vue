<template>
    <q-page class="fit column no-wrap justify-center items-center content-center">
        <h1>Global Settings</h1>
        <section>
            <q-btn
                round
                :color="$q.dark.isActive ? 'blue' : 'black'"
                icon="mdi-lightbulb-on-outline"
                @click="$q.dark.toggle()"
            />
        </section>
        <debugSection label="globalConfig" :obj="globalConfig"/>
        <debugSection label="serialDevice" :obj="serialDevice"/>
        <section>
            <q-btn
                v-ripple
                label="load from server"
                icon="sync"
                @click="globalConfigLoadFromServer()"
            />
            <q-btn
                v-ripple
                label="testDev pos"
                icon="sync"
                @click="testDev('pos')"
            />
            <q-btn
                v-ripple
                label="testDev rot"
                icon="sync"
                @click="testDev('rot')"
            />
        </section>
        <section>
            <q-input
                filled
                label="serial device"
                v-model="serialDevice"
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
        ...mapBindIDItems('global-config', ['serialDevice'])
    },
    methods: {
    },
    name: 'PageSettings'
}
</script>
