<template>
    <q-page class="fit column no-wrap justify-center items-center content-center">
        <h1>Global Settings</h1>
        <debugSection label="globalConfig" :obj="globalConfig"/>
        <debugSection label="globalConfig.btnSpace" :obj="globalConfig.btnSpace"/>
        <debugSection label="serialDevice" :obj="serialDevice"/>
        <debugSection label="btnSpace" :obj="btnSpace"/>
        <section>
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
                label="button spaceing (mm)"
                type="number"
                v-model.number="btnSpace"
                debounce="500"
            />
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
    name: 'PageSettings'
}
</script>
