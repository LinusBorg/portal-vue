import Vue from 'vue'
import { freeze } from '../utils'
const routes = {}

export { routes }

export class Wormhole {
  constructor (routes) {
    this.routes = routes
    this.clearQueue = []
    this.updateQueue = []
    this.runScheduled = false
  }

  send (name, passengers) {
    const job = { name, passengers }
    this.updateQueue.push(job)
    this._scheduleRun()
  }

  close (name) {
    const job = { name }
    this.clearQueue.push(job)
    this._scheduleRun()
  }

  _scheduleRun () {
    if (!this.runScheduled) {
      this.runScheduled = true

      setTimeout(this._runQueue.bind(this), 0)
    }
  }

  _runQueue () {
    const keys = Object.keys(this.routes)

    this.clearQueue.forEach(({ name }) => {
      if (keys.includes(name)) {
        this.routes[name] = undefined
      }
    })
    this.clearQueue = []

    this.updateQueue.forEach(({ name, passengers }) => {
      if (keys.includes(name)) {
        this.routes[name] = freeze(passengers)
      } else {
        Vue.set(this.routes, name, freeze(passengers))
      }
    })
    this.updateQueue = []

    this.runScheduled = false
  }

}
const wormhole = new Wormhole(routes)
export default wormhole
