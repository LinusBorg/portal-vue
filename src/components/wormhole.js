import Vue from 'vue'

const routes = {}

export { routes }

class Wormhole {
  constructor() {
    this.routes = routes
    this.clearQueue = []
    this.updateQueue = []
    this.runScheduled = false
  }

  sendUpdate(name, passengers) {
    const job = { name, passengers }
    this.updateQueue.push(job)
    this._scheduleRun()
  }

  clear(name) {
    const job = { name }
    this.clearQueue.push(job)
    this._scheduleRun()
  }

  _scheduleRun() {
    if (!this.runScheduled) {
      this.runScheduled = true

      setTimeout(this._runQueue.bind(this),0)
    }
  }

  _runQueue() {

    this.clearQueue.forEach(job => {
      Vue.delete(this.routes, job.name)
    })
    this.clearQueue = []

    this.updateQueue.forEach(({name, passengers }) => {
      Vue.set(this.routes, name, freeze(passengers))
    })
    this.updateQueue = []

    this.runScheduled = false

  }

}
const wormhole = new Wormhole()
export default wormhole


function freeze(item) {
  if (Array.isArray(item) || typeof item === 'object') {
    return Object.freeze(item)
  }
  return item
}
