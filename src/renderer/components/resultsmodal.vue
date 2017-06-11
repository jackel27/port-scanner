<style scoped>
</style>

<template>
  <div class="resultsmodal">
    <div class="modal modal-sm" :class="{'active' : toggle}">
      <div class="modal-overlay"></div>
      <div class="modal-container">
        Found {{ $parent.results }} Opened Ports!!!
        <button @click="closeModal()">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // import 'blah' from './components/blah.vue
    name: 'resultsmodal',
    props: [
      'toggle',
      'results'
    ],
    components: {
    },
    mounted () {
    },
    data () {
      return {
      }
    },
    methods: {
      closeModal () {
        this.$parent.toggle = false
      }
    }
  }
</script>
