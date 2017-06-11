<style scoped>
  .modal-container {
    width: 70vw;
    height: 40vh;
  }
  .modal-container {
    /* text-align: center; */
  }
  .btn {
    bottom: 4;
  }
  h1 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>

<template>
  <div class="resultsmodal">
    <transition name="fade">
      <div class="modal" v-if="toggle" :class="{'active' : toggle}">
        <div class="modal-overlay"></div>
        <div class="modal-container">
          <h1>Found {{ $parent.results }} Opened Ports!!!</h1>
        </div>
      </div>
    </transition>
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
    data () {
      return {
        isActive: false
      }
    },
    methods: {
      closeModal () {
        this.$parent.toggle = false
      }
    }
  }
</script>
