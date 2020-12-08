<template>
    <q-page class="fit column no-wrap justify-center items-center content-center">
        <debugSection label="gcList" :obj="gcList"/>
        <debugSection label="devObject" :obj="devObject"/>
        <section>
            isFindPending : '{{ areGCLoading }}'<br>
            <q-btn
                v-ripple
                label="gcFindAll"
                @click="gcFindAll()"
            />
        </section>
    </q-page>
</template>

<script>
import DebugSection from 'components/debugSection'
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data () {
        return {
            devObject: {
                value: '/dev/ttyUSB42'
            }
        }
    },
    components: { DebugSection },
    computed: {
        ...mapState('global-config', { areGCLoading: 'isFindPending' }),
        ...mapGetters('global-config', { findGCInStore: 'find' }),
        gcList () {
            return this.findGCInStore({ query: {} }).data
        }
    },
    methods: {
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
                    this.devObject = gcList
                }
                console.groupEnd()
            }).catch((error) => {
                console.error(error.message, error)
            })
            console.groupEnd()
        },
        ...mapActions('global-config', { findGC: 'find' })
    },
    name: 'PageDev3'
}
</script>
