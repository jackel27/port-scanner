<style scoped>
  .open {
    background-color: rgba(204, 0, 0, 0.553)!important;
  }
  .closed {
    background-color: rgba(0, 153, 255, 0.388)!important;
  }
  .na {
    background-color: rgba(102, 204, 129, 0.765)!important;
  }
</style>

<template>
  <div class="LandingPage">
    <resultsmodal :toggle="toggle" :results="results"></resultsmodal>
    <button @click="ScanPorts()">Scan</button>
    <ul>
      <li v-if="scancompleted && item.portstatus === 'open'" v-for="item in jsonarr">
      {{ item.port }}
      {{ item.tcp }}
      {{ item.udp }}
      {{ item.description }}
      <!-- {{ item.portstatus }} -->
      </li>
    </ul>
  </div>
</template>

<script>
  import jsonports from '../ports.json'
  import resultsmodal from './resultsmodal.vue'
  export default {
    name: 'LandingPage',
    components: {
      resultsmodal
    },
    created () {
      this.objtoarr()
    },
    data () {
      return {
        results: 0,
        toggle: false,
        jsonarr: [],
        jsonports: jsonports,
        scancompleted: false
      }
    },
    methods: {
      objtoarr () {
        Object.keys(this.jsonports.ports).forEach((port) => {
          if (this.jsonports.ports[port].port) {
            this.jsonarr.push({
              portindex: port,
              port: this.jsonports.ports[port].port,
              description: this.jsonports.ports[port].description,
              status: this.jsonports.ports[port].status,
              udp: this.jsonports.ports[port].udp,
              tcp: this.jsonports.ports[port].tcp,
              portstatus: ''
            })
          } else {
            for (let x = 0; x < this.jsonports.ports[port].length; x++) {
              this.jsonarr.push({
                portindex: port,
                port: this.jsonports.ports[port][x].port,
                description: this.jsonports.ports[port][x].description,
                status: this.jsonports.ports[port][x].status,
                udp: this.jsonports.ports[port][x].udp,
                tcp: this.jsonports.ports[port][x].tcp,
                portstatus: ''
              })
            }
          }
        })
      },
      ScanPorts () {
        this.scancompleted = false
        let promises = []
        let count = 0
        this.jsonarr.forEach((item, index) => {
          promises.push(new Promise((resolve, reject) => {
            this.$portscanner.checkPortStatus(item.portindex, '127.0.0.1', (error, status) => {
              // Status is 'open' if currently in use or 'closed' if available
              item.portstatus = status
              if (status === 'open') {
                count++
              }
              if (error) console.log('error')
              resolve()
            })
          }))
        })
        Promise.all(promises).then(() => {
          this.scancompleted = true
          this.results = count
          this.toggle = true
          console.log('FINISHED !')
        })
      }
    }
  }
</script>
