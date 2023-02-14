import Vue from 'vue'
import store from './store'
import App from './App'
import audioSong from "./components/audioSong/audio.vue"
Vue.component('audioSong', audioSong)
Vue.prototype.$store = store

// #ifndef VUE3
// import musics from "@/components/song.vue"
// Vue.component('musics',musics)

import uView from 'uview-ui'
Vue.use(uView)
// 如此配置即可
// uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}

// #endif
