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
                label="load from server"
                icon="sync"
                @click="globalConfigLoadFromServer()"
            />
            <q-btn
                v-ripple
                label="testDev Night"
                icon="sync"
                @click="testDev('Night')"
            />
            <q-btn
                v-ripple
                label="saveGC 'pos':'99'"
                icon="sync"
                @click="saveGC('pos', '99')"
            />
            <q-btn
                v-ripple
                label="saveGC 'pos':'10'"
                icon="sync"
                @click="saveGC('pos', '10')"
            />
            <q-btn
                v-ripple
                label="saveGC 'rot':'0°'"
                icon="sync"
                @click="saveGC('rot', '0°')"
            />
            <q-btn
                v-ripple
                label="saveGC 'rot':'75°'"
                icon="sync"
                @click="saveGC('rot', '75°')"
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
import {
    // useFind,
    useGet,
    makeFindMixin
} from 'feathers-vuex'

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
                // const modelClassName = 'GlobalConfig'
                // const configName = 'serialDevice'
                // const ModelClass = this.$FeathersVuex.api[modelClassName]
                // // const gcEntry = ModelClass.getFromStore(configName)
                // const { item: gcEntry } = useGet({
                //     model: ModelClass,
                //     id: configName
                // })
                // console.log('serialDevice get:', gcEntry.value.value)
                // return gcEntry.value.value

                // const configName = 'serialDevice'
                // const modelClassName = 'GlobalConfig'
                // const ModelClass = this.$FeathersVuex.api[modelClassName]
                // const gcEntry = ModelClass.getFromStore(configName)
                // console.log('serialDevice get', gcEntry)
                // let resultValue = null
                // if (gcEntry) {
                //     resultValue = gcEntry.value
                // }
                const resultValue = null
                return resultValue
            },
            set (val) {
                // do something
                console.group('serialDevice set')
                console.log('val', val)
                // this.serialDeviceInt = val
                // console.log('this.$store', this.$store)
                // console.log('this.$FeathersVuex', this.$FeathersVuex)
                // console.log('this.$store', this.$store)

                const configName = 'serialDevice'
                const modelClassName = 'GlobalConfig'
                const ModelClass = this.$FeathersVuex.api[modelClassName]

                const gcEntryNew = new ModelClass({
                    id: configName,
                    name: configName,
                    value: val
                })
                gcEntryNew.save().then(() => {
                    console.log('saveGC save: done.')
                }).catch((error) => {
                    console.error('saveGC save: ' + error.message, error)
                })
                console.groupEnd()
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
        },
        testDev: function (val) {
            console.group('testDev')

            const configName = 'serialDevice'
            const modelClassName = 'GlobalConfig'
            const ModelClass = this.$FeathersVuex.api[modelClassName]

            console.log('this', this)
            console.log('val', val)

            console.log('useGet')
            // const { item: gcEntry, isPending } = useGet({
            const { item: gcEntry } = useGet({
                model: ModelClass,
                id: configName
            })
            console.log('gcEntry', gcEntry)
            if (gcEntry.value) {
                console.log('gcEntry.value', gcEntry.value)
                console.log('gcEntry.value.value', gcEntry.value.value)
                console.log('gcEntry.value.name', gcEntry.value.name)
                console.log('gcEntry.value.id', gcEntry.value.id)
            }

            // ModelClass.get(configName).then((result) => {
            //     console.log('result', result)
            // }).catch((error) => {
            //     console.error(error.message, error)
            // })
            // no record found

            // const gcEntry = ModelClass.getFromStore(configName)
            // console.log('gcEntry', gcEntry)
            // console.log('gcEntry.value', gcEntry.value)

            // console.log('new ModelClass')
            // const gcEntryNew = new ModelClass({
            //     id: configName,
            //     name: configName,
            //     value: this.serialDeviceInt,
            //     description: 'testDev - ' + val + ' - new entry'
            // })
            // gcEntryNew.save().then(() => {
            //     console.log('gcEntryNew save: done.')
            // }).catch((error) => {
            //     console.error('gcEntryNew save: ' + error.message, error)
            // })
            // console.log('gcEntryNew', gcEntryNew)
            // console.log('gcEntryNew.value', gcEntryNew.value)

            // gcEntry.value.patch({
            //     value: 'HelloWorld Sun'
            // }).then(() => {
            //     console.log('patch done.')
            // })
            // gcEntry.value.save().then(() => {
            //     console.log('save done.')
            // })
            // console.log('gcEntry.value.value', gcEntry.value.value)

            // this.$store.dispatch(
            //     'global-config/patch', [configName, {
            //         name: configName,
            //         value: 'HelloWorld'
            //     }, {}]
            // ).then(() => {
            //     console.log('patch done.')
            // }).catch((error) => {
            //     console.error(error.message, error)
            // })

            console.groupEnd()
        },
        saveGC: function (configName, val) {
            console.group('saveGC')

            const modelClassName = 'GlobalConfig'
            const ModelClass = this.$FeathersVuex.api[modelClassName]

            console.log('this', this)
            console.log('configName', configName)
            console.log('val', val)

            console.log('new ModelClass')
            const gcEntryNew = new ModelClass({
                id: configName,
                name: configName,
                value: val,
                description: 'testDev - ' + val + ' - new entry'
            })
            gcEntryNew.save().then(() => {
                console.log('saveGC save: done.')
            }).catch((error) => {
                console.error('saveGC save: ' + error.message, error)
            })
            console.log('gcEntryNew', gcEntryNew)
            console.log('gcEntryNew.value', gcEntryNew.value)

            // gcEntry.value.patch({
            //     value: 'HelloWorld Sun'
            // }).then(() => {
            //     console.log('patch done.')
            // })
            // gcEntry.value.save().then(() => {
            //     console.log('save done.')
            // })
            // console.log('gcEntry.value.value', gcEntry.value.value)

            // this.$store.dispatch(
            //     'global-config/patch', [configName, {
            //         name: configName,
            //         value: 'HelloWorld'
            //     }, {}]
            // ).then(() => {
            //     console.log('patch done.')
            // }).catch((error) => {
            //     console.error(error.message, error)
            // })

            console.groupEnd()
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
