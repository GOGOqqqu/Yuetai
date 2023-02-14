import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		id: '变成了你们那边',
		arrayLists: [], // 歌曲id
		songInformation: [],  // 歌曲信息
		city: '3',
	},
	getters: {
		// getCity: function(state) {
		// 	return state.city
		// },
		// getCitys: function(state) {
		// 	return state.id
		// },
		getArrayList: function(state) {
			return state.arrayLists
		},
		getSongInformation: function(state) {
			return state.songInformation
		}
	},
	mutations: {
		// // 同步修改
		// setCity: function(state, name) {
		// 	state.city = name
		// 	// state.id = name
		// },
		// setCitys: function(state, name) {
		// 	state.id = name
		// 	// state.id = name
		// },
		
		// 添加歌曲信息
		addLists: function(state, name) {
			if(state.arrayLists.length < 1 ){
				state.arrayLists.push(name.id)
				state.songInformation.push(name)
			}else {
				let shu = state.arrayLists.findIndex(item => item == name.id)
				if(shu > -1){
					console.log('已经有数据了，请勿重复添加');
				}else{
					state.arrayLists.push(name.id)
					console.log('歌曲id组',state.arrayLists);
					
					state.songInformation.push(name)
					console.log('歌曲信息组',state.songInformation);
				}

			}
		},
		// // 添加歌曲信息
		// addInformations: function(state, str) {
		// 		state.songInformation.push(str)
		// 		console.log('歌曲信息组',state.songInformation);
		// }
	},
	actions: {
		// 异步修改g
		// getCityName: function({
		// 	commit,
		// 	state
		// }, name) {

		// 	console.log(name);
		// 	commit('setCity', name)
		// },
		// getCityNames: function({commit,state}, name) {
		
		// 	console.log(name);
		// 	commit('setCitys', name)
		// },
		
		// 添加 歌曲信息
		addArrayList: function({commit,state},name){
			console.log(name);
			commit('addLists',name)
		},
		// // 添加 
		// addSongInformation: function({commit,state},str){
		// 	commit('addInformations',str)
		// }
	}
})
export default store
