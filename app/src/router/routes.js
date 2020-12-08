
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
