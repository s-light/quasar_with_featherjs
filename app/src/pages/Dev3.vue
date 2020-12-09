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
import { findList } from '../store/mapBindIDItems.js'

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
            this.devObject = findList('global-config')
        },
        ...mapActions('global-config', { findGC: 'find' })
    },
    created () {
        // this.findGc({ query: {} })
        //     .then(response => {
        //         // In the find action, the 'todos' array is not a reactive list, but the individual records are.
        //         // eslint-disable-next-line no-unused-vars
        //         const gcList = response.data || response
        //     })
        this.devObject = findList('global-config')
    },
    name: 'PageDev3'
}
</script>
