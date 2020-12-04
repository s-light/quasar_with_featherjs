<template>
    <q-page class="fit column no-wrap justify-center items-center content-center">
        <section class="q-pa-md row justify-center">
            <h1>Quasar with FeathersJS and vuex</h1>
        </section>
        <section>
            <a :href="url">repository</a>
        </section>
    </q-page>
</template>

<script>
export default {
    data () {
        return {
            url: 'https://github.com/s-light/quasar_with_featherjs/'
        }
    },
    name: 'PageIndex'
}
</script>
