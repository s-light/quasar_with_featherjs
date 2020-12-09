
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue') },
            { path: 'simple', component: () => import('pages/Simple.vue') },
            { path: 'extended', component: () => import('pages/Extended.vue') },
            { path: 'dev0', component: () => import('pages/Dev0.vue') },
            { path: 'dev1', component: () => import('pages/Dev1.vue') },
            { path: 'dev2', component: () => import('pages/Dev2.vue') },
            { path: 'dev3', component: () => import('pages/Dev3.vue') },
            { path: 'dev4', component: () => import('pages/Dev4.vue') },
            { path: 'settings', component: () => import('pages/Settings.vue') }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes

export const linksData = [
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
        title: 'Dev4',
        icon: 'code',
        link: 'dev4'
    },
    {
        title: 'Settings',
        icon: 'settings',
        link: 'settings'
    }
]
