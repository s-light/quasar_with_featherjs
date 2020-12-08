
<!-- usage:

<DebugSection :obj="myValueToDebug"/>

-->

<template>
    <section class="debug">
        <label>{{ label }}</label>
        <pre>{{ obj | pretty }}</pre>
    </section>
</template>

<script>
export default {
    // name: 'debugSection',
    props: {
        obj: {
            // type: [Object, Array, String, Num    ],
            default: function () {
                return {}
            }
        },
        label: {
            type: String,
            default: ''
        }
    },
    data () {
        return {}
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
    }
}
</script>

<style media="screen">
section.debug {
    min-width: 4em;
    min-height: 2em;
    background-color: hsla(230.1, 100%, 50%, 0.05);
    border-radius: 0.5em;
    box-shadow: 0 0 20px hsla(200, 100%, 50%, 0.2);
    margin: 1em;
    padding: 1em;
}
section.debug label {
    opacity: 0.5
}
section.debug pre {
    margin: 0;
    padding: 0;
}
</style>
