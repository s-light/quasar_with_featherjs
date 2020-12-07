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
            <pre>{{ globalConfig | pretty }}</pre>
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
            <pre>{{ serialDevice }}</pre>
            <pre>{{ serialDeviceInt }}</pre>
        </section>
        <section>
            <q-btn
                v-ripple
                icon="sync"
                @click="globalConfigLoadFromServer()"
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
// import { useFind, useGet } from 'feathers-vuex'
import { useGet, makeFindMixin } from 'feathers-vuex'

export default {
    data () {
        return {
            serialDeviceInt: '/dev/ttyUSB42'
        }
    },
    mixins: [
        makeFindMixin({ service: 'global-config' })
    ],
    computed: {
        globalConfigParams () {
            return { query: {} }
        },
        serialDevice: {
            get () {
                // return this.$store.state.appconfig.globalMessage
                // console.log(this)
                return this.serialDeviceInt
            },
            set (val) {
                // do something
                console.log('serialDevice set', val)
                this.serialDeviceInt = val
                // console.log('this.$store', this.$store)
                // console.log('this.$FeathersVuex', this.$FeathersVuex)
                // console.log('this.$store', this.$store)
                const { GlobalConfig } = this.$FeathersVuex.api
                console.log('GlobalConfig', GlobalConfig)
                const { item: gconfig, isPending } = useGet({
                    model: GlobalConfig,
                    id: 'serialDevice'
                })
                console.log('gconfig', gconfig)
                console.log('isPending', isPending)
                // this.$store.commit('global-config/setSerialDevice', val)
            }
        }
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
    name: 'PageSettings'
}
</script>
