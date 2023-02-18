import * as Vue from 'vue';

const eventBus = {}

eventBus.install = function (Vue) {
    Vue.prototype.$bus = new Vue()
  }

export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('bus', eventBus)
}

