<template>
    <q-layout view="lHh Lpr lFf">
        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
        >
            <q-list>
                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
    {
        title: 'Welcome',
        icon: 'home',
        link: '/'
    },
    {
        title: 'Vanilla',
        icon: 'aspect_ratio',
        link: 'simple'
    },
    {
        title: 'Vuex',
        icon: 'code',
        link: 'extended'
    },
    {
        title: 'Dev0',
        icon: 'code',
        link: 'dev0'
    },
    {
        title: 'Dev1',
        icon: 'code',
        link: 'dev1'
    },
    {
        title: 'Dev2',
        icon: 'code',
        link: 'dev2'
    },
    {
        title: 'Dev3',
        icon: 'code',
        link: 'dev3'
    },
    {
        title: 'Settings',
        icon: 'settings',
        link: 'settings'
    }
]

export default {
    name: 'MainLayout',
    components: { EssentialLink },
    data () {
        return {
            leftDrawerOpen: false,
            essentialLinks: linksData
        }
    }
}
</script>
