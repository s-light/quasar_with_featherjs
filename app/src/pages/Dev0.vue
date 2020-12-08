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
                @click="testDev('pos')"
            />
            <q-btn
                v-ripple
                label="testDev rot"
                @click="testDev('rot')"
            />
            <q-btn
                v-ripple
                label="gcFindAll"
                @click="gcFindAll()"
            />
        </section>
        <section>
            <q-btn
                v-ripple
                label="gcFind pos"
                @click="gcFind('pos')"
            />
            <q-btn
                v-ripple
                label="gcFind rot"
                @click="gcFind('rot')"
            />
            <q-btn
                v-ripple
                label="gcGet pos"
                @click="gcGet('pos')"
            />
            <q-btn
                v-ripple
                label="gcGet rot"
                @click="gcGet('rot')"
            />
        </section>
        <section>
            <q-btn
                v-ripple
                label="gcGetter pos"
                @click="gcGetter('pos')"
            />
            <q-btn
                v-ripple
                label="gcGetter rot"
                @click="gcGetter('rot')"
            />
            <q-btn
                v-ripple
                label="gcSetter pos 22"
                @click="gcSetter('pos', 22)"
            />
            <q-btn
                v-ripple
                label="gcSetter pos 77"
                @click="gcSetter('pos', 77)"
            />
        </section>
        <section>
            <q-btn
                v-ripple
                label="gcUseFind pos"
                @click="gcUseFind('pos')"
            />
            <q-btn
                v-ripple
                label="gcUseFind rot"
                @click="gcUseFind('rot')"
            />
            <q-btn
                v-ripple
                label="gcUseGet pos"
                @click="gcUseGet('pos')"
            />
            <q-btn
                v-ripple
                label="gcUseGet rot"
                @click="gcUseGet('rot')"
            />
        </section>
        <section>
            <q-btn
                v-ripple
                label="gcSave 'pos':'99'"
                @click="gcSave('pos', '99')"
            />
            <q-btn
                v-ripple
                label="gcSave 'pos':'10'"
                @click="gcSave('pos', '10')"
            />
            <q-btn
                v-ripple
                label="gcSave 'rot':'0°'"
                @click="gcSave('rot', '0°')"
            />
            <q-btn
                v-ripple
                label="gcSave 'rot':'75°'"
                @click="gcSave('rot', '75°')"
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
import DebugSection from 'components/debugSection'
// import {
//     // mapState,
//     // mapGetters,
//     mapActions
// } from 'vuex'
import {
    useFind,
    useGet,
    makeFindMixin
} from 'feathers-vuex'

export default {
    data () {
        return {
            // serialDeviceInt: '/dev/ttyUSB42'
        }
    },
    components: { DebugSection },
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
                const modelName = 'global-config'
                const configName = 'serialDevice'
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
                // console.log('this.$store.state', this.$store.state)
                let resultValue = null
                const gcItem = this.$store.state[modelName].keyedById[configName]
                if (gcItem) {
                    resultValue = gcItem.value
                }
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
                    console.log('gcSave save: done.')
                }).catch((error) => {
                    console.error('gcSave save: ' + error.message, error)
                    if (error.name === 'NotFound') {
                        gcEntryNew.create()
                    } else {
                        console.error('gcSave save: ' + error.message, error)
                    }
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

            // const modelClassName = 'GlobalConfig'
            // const ModelClass = this.$FeathersVuex.api[modelClassName]
            // // const configName = 'pos'
            // const configName = val

            console.log('this', this)
            console.log('val', val)

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
        gcSetter: function (configName, val) {
            console.group('gcSetter')
            // this only mutates the value in the store. no interaction with the backend.
            const modelName = 'global-config'
            const gcItem = this.$store.state[modelName].keyedById[configName]
            // console.log('gcItem', gcItem)
            if (gcItem) {
                const gcItemNew = {
                    id: gcItem.id,
                    name: configName,
                    value: val
                }
                this.$store.commit(modelName + '/updateItem', gcItemNew)

                // this is not allowed:
                // gcItem.value = val
                // this.$store.commit(modelName + '/updateItem', gcItem)
            }
            console.groupEnd()
        },
        gcGetter: function (configName) {
            console.group('gcGetter')
            // this only reads the value from the store. no interaction with the backend.
            const modelName = 'global-config'
            const gcItem = this.$store.state[modelName].keyedById[configName]
            console.log('gcItem', gcItem)
            if (gcItem) {
                if (gcItem.value) {
                    console.log('gcItem.value', gcItem.value)
                    console.log('gcItem.name', gcItem.name)
                    console.log('gcItem._id', gcItem._id)
                }
            }
            console.groupEnd()
        },
        gcFindAll: function () {
            console.group('gcFindAll')
            const modelClassName = 'GlobalConfig'
            const ModelClass = this.$FeathersVuex.api[modelClassName]
            const params = {
                query: {},
                paginate: false
            }
            ModelClass.find(params).then((resultFind) => {
                console.group('gcFindAll.then')
                console.log('resultFind', resultFind)
                const gcList = resultFind.data
                console.log('gcList', gcList)
                if (gcList) {
                    console.log('gcList[0]', gcList[0])
                    const gcItem = gcList[0]
                    if (gcItem) {
                        console.log('gcItem.value', gcItem.value)
                        console.log('gcItem._id', gcItem._id)
                    }
                }
                console.groupEnd()
            }).catch((error) => {
                console.error(error.message, error)
            })
            console.groupEnd()
        },
        gcFind: function (configName) {
            console.group('gcFind')
            const modelClassName = 'GlobalConfig'
            const ModelClass = this.$FeathersVuex.api[modelClassName]
            const params = {
                query: {
                    // id: configName,
                    name: configName
                },
                paginate: false
            }
            ModelClass.find(params).then((result) => {
                console.group('gcFind.then')
                console.log('result', result)
                const gcList = result.data
                console.log('gcList', gcList)
                if (gcList) {
                    console.log('gcList[0]', gcList[0])
                    const gcItem = gcList[0]
                    if (gcItem) {
                        console.log('gcItem.value', gcItem.value)
                        console.log('gcItem._id', gcItem._id)
                    }
                }
                console.groupEnd()
            }).catch((error) => {
                console.error(error.message, error)
            })
            console.groupEnd()
        },
        gcGet: function (configName) {
            console.group('gcGet')
            const modelClassName = 'GlobalConfig'
            const ModelClass = this.$FeathersVuex.api[modelClassName]
            ModelClass.get(configName).then((gcItem) => {
                console.log('gcItem', gcItem)
                if (gcItem.value) {
                    console.log('gcItem.value', gcItem.value)
                    console.log('gcItem.name', gcItem.name)
                    console.log('gcItem._id', gcItem._id)
                }
            }).catch((error) => {
                if (error.name === 'NotFound') {
                    console.log('gcGet - ' + error.name + ': ', error.message)
                } else {
                    console.error('gcGet: ' + error.message, error)
                }
            })
            console.groupEnd()
        },
        gcUseFind: function (configName) {
            console.group('gcUseFind')
            // the result from useFind is reactive!!
            // it also watches the id and params obj.
            const modelClassName = 'GlobalConfig'
            const ModelClass = this.$FeathersVuex.api[modelClassName]
            const params = {
                query: {
                    // id: configName,
                    name: configName
                }
            }
            const gcList = useFind({ model: ModelClass, params: params })
            console.log('gcList', gcList)
            if (gcList.items) {
                console.log('gcList.items.value', gcList.items.value)
                console.log('gcList.items.value[0]', gcList.items.value[0])
                const gcItem = gcList.items.value[0]
                if (gcItem) {
                    console.log('gcItem.value', gcItem.value)
                    console.log('gcItem._id', gcItem._id)
                }
            }
            console.groupEnd()
        },
        gcUseGet: function (configName) {
            console.group('gcUseGet')
            // the result from useGet is reactive!!
            // it also watches the id and params obj.
            const modelClassName = 'GlobalConfig'
            const ModelClass = this.$FeathersVuex.api[modelClassName]
            // const params = {
            //     query: {
            //         // id: configName,
            //         name: configName
            //     }
            // }
            console.log('useGet')
            // const { item: gcItem } = useGet({
            const result = useGet({
                model: ModelClass,
                // params: params,
                id: configName
            })
            console.log('result', result)
            const gcItem = result.item.value
            console.log('gcItem', gcItem)
            if (gcItem) {
                console.log('gcItem.value', gcItem.value)
                console.log('gcItem.name', gcItem.name)
                console.log('gcItem.id', gcItem.id)
            }
            console.groupEnd()
        },
        gcSave: function (configName, val) {
            console.group('gcSave')

            const modelClassName = 'GlobalConfig'
            const ModelClass = this.$FeathersVuex.api[modelClassName]

            console.log('this', this)
            console.log('configName', configName)
            console.log('val', val)

            // ------------------------------------------
            // get item
            const { item: resultUseGet } = useGet({
                model: ModelClass,
                id: configName
            })
            let gcItem = resultUseGet.value
            console.log('gcItem', gcItem)

            // ------------------------------------------
            // patch or create
            console.log('patch or create')
            if (!gcItem) {
                console.log('new ModelClass')
                gcItem = new ModelClass({
                    id: configName,
                    _id: configName,
                    name: configName,
                    value: val
                    // description: 'testDev - ' + val + ' - new entry'
                })
            }
            // gcItem.save().then(() => {
            gcItem.patch({ data: { value: val } }).then(() => {
                console.log('gcSave patch: done.')
            }).catch((error) => {
                if (error.name === 'NotFound') {
                    console.log('gcSave - ' + error.name + ': ', error.message)
                    gcItem.create().then(() => {
                        console.log('gcSave create: done.')
                    }).catch((error) => {
                        console.error('gcSave: create - ' + error.message, error)
                    })
                } else {
                    console.error('gcSave: patch - ' + error.message, error)
                }
            })
            console.log('gcItem', gcItem)
            console.log('gcItem.value', gcItem.value)

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
        // ...mapActions('global-config', { findGC: 'find' })
    },
    // created () {
    //     // Find all appointments. We'll use the getters to separate them.
    //     // this.findGC({ query: {} })
    // },
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
