<template>
	<view class="nav">
		<!--  头部导航栏 -->
		<view class="lists">
			<view class="bar">
				<view class="barList" :class="index == 0 ? 'chun' : ''" @click="ClickA(0)">
					推荐音乐
				</view>
				<view class="barList" :class="index == 1 ? 'chun' : ''" @click="ClickA(1)">
					热歌榜
				</view>
				<view class="barList" :class="index == 2 ? 'chun' : ''" @click="ClickA(2)">
					搜索
				</view>
			</view>
		</view>


		<!-- 推荐音乐 -->
		<view class="recommend yi" :class="index == 0 ? 'shows' : 'active'">

			<view class="text1">
				<view class="red"></view>
				<view>编辑推荐</view>
			</view>
			<!-- 推荐音乐  的编辑推荐 -->
			<view class="recommend-text">
				<view class="div" v-for="item in MusicList" :key="item.id" @click="ClickJump(item.id)">
					<view class="img">
						<image :src="item.picUrl" aspectFit></image>
					</view>
					<view class="textss">{{ item.name }}</view>
					<view class="text-top">
						<view class="zi">

							{{item.playCount < 100000000  ? Math.floor(item.playCount / 10000 * 10) / 10 + '万' :  Math.floor(item.playCount / 100000000 * 10) / 10  + '亿' }}
						</view>
						<svg t="1668826840071" class="icon ic" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="7967">
							<path
								d="M862.272595 605.405343l-41.589211 0c0-208.754464-34.268478-428.440909-301.521265-428.440909-213.875089 0-322.31587 136.798643-322.31587 428.440909l-41.589211 0c0-312.108391 125.833917-470.03012 363.90508-470.03012C826.704518 135.376247 862.272595 396.650879 862.272595 605.405343z"
								p-id="7968" fill="#cdcdcd"></path>
							<path
								d="M224.122477 859.601766l-16.568351 3.849678c-56.153928 13.047154-106.165971-31.03176-124.684744-110.736057-18.507516-79.656201 6.927783-141.315516 63.081711-154.36267l16.576537-3.851725L224.122477 859.601766zM138.093125 639.657448c-27.721365 18.498306-31.527041 64.72821-21.605064 107.428731 9.925047 42.716894 33.727149 82.550111 66.760496 86.914512L138.093125 639.657448z"
								p-id="7969" fill="#cdcdcd"></path>
							<path
								d="M257.088286 886.868783l-0.824785 0.191358c-31.746028 7.375991-63.578014-12.446473-70.954005-44.192501l-50.241264-216.235856c-7.375991-31.746028 12.455683-63.571874 44.202735-70.947865 32.571836-7.567349 64.403822 12.254092 71.779813 44.00012l50.241264 216.235856C308.665988 847.666946 288.834314 879.492792 257.088286 886.868783zM187.794084 588.630285c-14.303774 3.323699-22.720468 16.824177-19.589151 30.303166l50.241264 216.235856c3.131317 13.477966 16.638959 21.88545 30.116925 18.754133l0.824785-0.191358c13.477966-3.131317 21.895683-16.632819 18.764366-30.110785l-50.241264-216.235856C214.779691 593.905428 201.27205 585.497944 187.794084 588.630285z"
								p-id="7970" fill="#cdcdcd"></path>
							<path
								d="M861.758895 591.985706l16.521279 3.838422c55.965639 13.003152 81.316004 74.455759 62.869886 153.844877-18.456351 79.437214-68.300572 123.367749-124.266212 110.364597l-16.513092-3.836375L861.758895 591.985706zM841.108576 830.683133c32.921807-4.350075 56.644091-44.050262 66.536392-86.62287 9.888208-42.557258 6.094812-88.632643-21.533432-107.068528L841.108576 830.683133z"
								p-id="7971" fill="#cdcdcd"></path>
							<path
								d="M723.463156 812.663734l50.072419-215.510332c7.351432-31.639604 39.076994-51.395554 71.538313-43.852764 31.639604 7.351432 51.404764 39.070854 44.054355 70.710458l-50.072419 215.510332c-7.351432 31.639604-39.076994 51.395554-70.716598 44.044122l-0.822738-0.191358C735.876883 876.021737 716.111724 844.303338 723.463156 812.663734zM806.561759 604.826152 756.48934 820.336484c-3.121084 13.43294 5.26798 26.889417 18.700921 30.010501l0.822738 0.191358c13.43294 3.121084 26.895557-5.257747 30.016641-18.690688l50.072419-215.510332c3.121084-13.43294-5.26798-26.889417-19.523659-30.200836C823.144436 583.01438 809.682843 591.393211 806.561759 604.826152z"
								p-id="7972" fill="#cdcdcd"></path>
						</svg>
					</view>
				</view>


			</view>

			<view class="text1">
				<view class="red"></view>
				<view>最新音乐</view>
			</view>

			<!-- 推荐音乐  的最新音乐 -->
			<view class="recommend-text1">
				<view class="newests" v-for="item in Latestmusic" :key="item.id" @click="ClickSong(item)">
					<view class="authors">{{item.name}}{{item.song.alias[0]}}</view>
					<view class="SongTitles">
						<view class="img1" :class="item.song.sqMusic == null ? 'actives' :''"></view>
						<view class="left">
							<span v-for="(a,b) in item.song.artists" :key="b">
								{{a.name}}/
							</span>
							-
							<span>{{item.song.album.name}}</span>
						</view>

					</view>
					<view class="img2">
					</view>
				</view>
			</view>

		</view>


		<!-- 热歌榜 -->
		<view class="songs yi" :class="index == 1 ? 'shows' : 'active'">
			<view class="songs-tou">
				<view class="songs-img"></view>
				<view class="riqi">
					更新日期：{{ date }}
				</view>
			</view>
			
			<view class="recommend-text1">
				<view class="newests" v-for="(item,index) in Rankings" :key="item.id" @click="ClickSongs(item)">

					<view class="newests-left">{{index >= 9 ? (index + 1) : '0' + (index + 1)}}</view>
					<view class="newests-right">
						<view class="authors">{{item.name}}</view>
						<view class="SongTitles">
							<view class="img1" :class="item.sq == null ? 'actives' :''"></view>
							<view class="left">
								<span v-for="(a,b) in item.ar" :key="b">
									{{a.name}}
								</span>
								-
								<span>{{item.name}}</span>
							</view>

						</view>
					</view>

					<view class="img2">
					</view>

				</view>
				
				<u-loadmore :status="status" />
			</view>
		</view>

		<!-- 搜索页面 -->
		<view class="search yi" :class="index == 2 ? 'shows' : 'active'">


			<!-- 搜索框 -->
			<view class="search-head">
				<u-search placeholder="搜索歌曲、歌手、专辑" v-model.trim="texts" :clearabled="true" @focus="FocusInput" @blur="BlurInput"
					:showAction="false"></u-search>
			</view>
			<view class="hide-content" v-if="listHide">
				<view class="ren">
					热门搜索
				</view>
				<!-- 热搜推荐列表 -->
				<ul class="list">
					<li v-for="(item,index) in hotsearch" :key="index" @click="RequestE(item.first)">
						{{item.first}}
					</li>
				</ul>
				<!-- 历史记录 -->
				<view class="content" v-if="history.length > 0">
					<view class="content-content" v-for="item in history">
						<view class="content-img" @click="RequestF(item)">
							<svg t="1669117853758" class="icon img" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="24010">
								<path
									d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-960C265.6 64 64 265.6 64 512s201.6 448 448 448 448-201.6 448-448S758.4 64 512 64z"
									p-id="24011" fill="#dbdbdb"></path>
								<path
									d="M512 304c9.6 0 16 6.4 16 16v256c0 9.6-6.4 16-16 16s-16-6.4-16-16v-256c0-9.6 6.4-16 16-16z"
									p-id="24012" fill="#dbdbdb"></path>
								<path
									d="M512 608c-19.2 0-32-12.8-32-32v-256c0-19.2 12.8-32 32-32s32 12.8 32 32v256c0 19.2-12.8 32-32 32z m0-304v16-16z"
									p-id="24013" fill="#dbdbdb"></path>
								<path
									d="M646.4 662.4c-3.2 6.4-12.8 9.6-22.4 6.4l-108.8-67.2c-6.4-3.2-9.6-12.8-6.4-22.4 3.2-6.4 12.8-9.6 22.4-6.4L640 640c9.6 3.2 12.8 16 6.4 22.4z"
									p-id="24014" fill="#dbdbdb"></path>
								<path
									d="M633.6 684.8c-6.4 0-12.8 0-16-3.2l-108.8-67.2c-16-9.6-19.2-28.8-9.6-44.8 9.6-16 28.8-19.2 44.8-9.6l108.8 67.2c16 9.6 19.2 28.8 9.6 44.8-6.4 9.6-19.2 12.8-28.8 12.8z m-108.8-96l124.8 73.6-12.8-9.6-112-64z"
									p-id="24015" fill="#dbdbdb"></path>
							</svg>
						</view>
						<view class="content-text" @click="RequestF(item)">
							{{item}}
						</view>
						<view class="wrong" @click="DeleteList(item)">x</view>
					</view>
				</view>
			</view>
			<view class="show-content" v-if="!listHide">

				<view class="content-top">
					搜索 "{{texts}} "
				</view>
				<!-- // 搜索 出推荐的列表 -->
				<view class="content-bottom" v-if="shows">
					<view class="top" v-for="(item,index) in array1" :key="index" @click="RequestF(item.name)">
						<svg t="1669168994162" class="icon hn" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="2676">
							<path
								d="M953.504 908.256l-152.608-163.296c61.856-74.496 95.872-167.36 95.872-265.12 0-229.344-186.624-415.968-416.032-415.968-229.344 0-415.968 186.592-415.968 415.968s186.624 415.968 416 415.968c60.096-0.032 118.048-12.576 172.224-37.248 16.096-7.328 23.2-26.304 15.872-42.368-7.328-16.128-26.4-23.264-42.368-15.872-45.856 20.864-94.88 31.456-145.76 31.488-194.08 0-351.968-157.888-351.968-351.968 0-194.048 157.888-351.968 351.968-351.968 194.112 0 352.032 157.888 352.032 351.968 0 91.36-34.848 177.92-98.08 243.744-12.256 12.736-11.84 32.992 0.864 45.248 0.96 0.928 2.208 1.28 3.296 2.08 0.864 1.28 1.312 2.752 2.4 3.904l165.504 177.088c6.272 6.752 14.816 10.144 23.36 10.144 7.84 0 15.68-2.848 21.856-8.64C964.864 941.408 965.568 921.152 953.504 908.256z"
								p-id="2677" fill="#dbdbdb"></path>
						</svg>
						<view class="text">
							{{item.name}}
						</view>
					</view>
				</view>
				<!-- 搜索 列表-->
				<view class="recommend-text1" v-if="!shows">
					<view class="newests" v-for="item in SearchList" :key="item.id" @click="ClickSonga(item)">
						<view class="authors">{{item.name}} {{item.alias[0]}}</view>
						<view class="SongTitles">
							<view class="img1"></view>
							<view class="left">
								<span v-for="(a,b) in item.artists" :key="b">
									{{a.name}}
								</span>
								-
								<span>{{item.name}}</span>
							</view>
						</view>
						<view class="img2">
						</view>
					</view>
				</view>
				
			</view>
		</view>

	</view>
</template>

<script>
	import common from '../../common/js/common.js'
	export default {
		data() {
			return {
				index: 0, //控制头部导航栏的内容的出现
				show: true,
				firstFocus: false,
				MusicList: Array, // 推荐音乐的歌单
				Latestmusic: Array, // 推荐音乐的 最新音乐
				MusicLeaderboard: Array, // 音乐排行榜 
				Ranking: Array, // 热歌榜总数据
				shu: 10, // 加载长度
				Rankings: Array, // 热歌榜 部分数据
				hotsearch: '', // 热搜列表
				date: common.DateTime(), // 日期
				status: 'loadmore', //控制 懒加载数据的 状态
				texts: "", // 搜索的关键词
				// textss: Array, // 搜索的歌词
				SearchList: '', // 搜索  搜索出的列表
				history: [], // 历史 记录
				array1: [], // 搜索 出的列表
				listHide: true , //控制搜索页的隐藏与显示
				shows: true // 搜索 出的列表的出现 与  搜索 出的推荐与隐藏
			};
		},
		watch: {
			texts: function(newVal, oldVal) {
                if(newVal == ''){
					this.listHide=true
					this.SearchList= ''
					this.array1=[]
					this.shows = true
				}
				//使用watch来响应数据的变化，第一个参数为newVal新值，第二个参数oldVal为旧值
				console.log("b--newVal: ", newVal, "b--oldVal: ", oldVal);
				if (this.history.indexOf(newVal) > -1 || newVal == '') {

				} else {
					this.history.push(newVal)
					console.log('添加历史记录', this.history);
				}
				if (this.texts == '') {
				
				} else {
					uni.request({
						url: `https://apis.netstart.cn/music/search?keywords=${this.texts}&limit=6`,
						method: 'GET',
						header: {
							'content-type': 'application/json'
						},
						success: data => {
							// console.log('输入框聚焦触发', data.data.result.songs)
							this.array1 = data.data.result.songs
						}
					})
				}
			}

		},
		onReachBottom() {
			setTimeout(() => {
				this.shu += 10;
				if (this.shu <= this.Ranking.length) {
					this.Rankings = this.Ranking.slice(0, this.shu);
					this.status = 'loading';
				} else {
					this.status = 'nomore';
				}
			}, 2000)
		},
		methods: {
			//输入框聚焦时触发
			FocusInput() {
				this.listHide = false

			},
			//输入框失去聚焦时触发
			BlurInput() {
				// this.listHide = true
			},
			click(item) {
				console.log('item', item);
			},
			// 点击切换 
			ClickA(e) {
				this.index = e;
			},

			// 最新音乐的跳转
			ClickSong(str) {
				console.log(str);
				let dataShu = {
					id: str.id,
					title: str.name,
					picture: str.picUrl,
					author: str.song.artists[0].name 
				}
				this.$store.dispatch('addArrayList', dataShu)
			
			
				uni.navigateTo({
					url: `/pages/song/song?id=` + encodeURIComponent(JSON.stringify(dataShu)),
					animationType: 'pop-in',
					animationDuration: 300
				});
				// console.log("歌曲id：", str.id);
			},
			// 热歌榜音乐的跳转
			ClickSongs(str) {
				console.log(str);
				let dataShu = {
					id: str.id,
					title: str.name,
					picture: str.al.picUrl,
					author: str.ar[0].name
				}
				this.$store.dispatch('addArrayList', dataShu)
			
			
				uni.navigateTo({
					url: `/pages/song/song?id=` + encodeURIComponent(JSON.stringify(dataShu)),
					animationType: 'pop-in',
					animationDuration: 300
				});
				// console.log("歌曲id：", str.id);
			},
			// 搜索音乐的跳转
			ClickSonga(str) {
				console.log(str);
				let dataShu = {
					id: str.id,
					title: str.name,
					picture: str.artists[0].img1v1Url,
					author: str.artists[0].name 
				}
				this.$store.dispatch('addArrayList', dataShu)
			
			
				uni.navigateTo({
					url: `/pages/song/song?id=` + encodeURIComponent(JSON.stringify(dataShu)),
					animationType: 'pop-in',
					animationDuration: 300
				});
				// console.log("歌曲id：", str.id);
			},
			// 点击跳转到 歌单页
			ClickJump(e) {
				uni.navigateTo({
					url: `/pages/SongPage/SongPage?id=${e}`,
					animationType: 'pop-in',
					animationDuration: 300
				});
				console.log("歌单id：", e);
			},

			//编辑推荐 6条
			RequestB() {
				uni.request({
					url: 'https://apis.netstart.cn/music/personalized?limit=6',
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						// console.log('歌单推荐 ', data.data.result)
						this.MusicList = data.data.result
					}
				})
			},

			// 推荐音乐
			RequestA() {
				uni.request({
					url: 'https://apis.netstart.cn/music/personalized/newsong',
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						console.log('歌曲', data.data.result)
						this.Latestmusic = data.data.result
					}
				})
			},

			// 热歌榜
			RequestC() {
				uni.request({
					url: 'https://apis.netstart.cn/music/playlist/detail?id=3778678',
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						// console.log('RequestF热歌', data.data.playlist.tracks)
						this.Ranking = data.data.playlist.tracks
						this.Rankings = this.Ranking.slice(0, 10)
					}
				})
			},

			// 热搜
			RequestD() {
				uni.request({
					url: `https://apis.netstart.cn/music/search/hot`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						// console.log('歌曲搜索列表', data.data.result.hots)
						this.hotsearch = data.data.result.hots
					}
				})
			},

			// 热搜点击 搜索
			RequestE(url) {
				console.log(url);
				this.listHide = false
				this.texts= url
				// this.shows =false
				uni.request({
					url: `https://apis.netstart.cn/music/search?keywords=${url}&limit=15`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						// console.log('歌曲搜索', data.data.result.songs)
						this.SearchList = data.data.result.songs

						if (this.history.indexOf(url) > -1) {

						} else {
							this.history.push(url)
							console.log(this.history);
						}
					}
				})
			},
			// 搜索出来的数据 进行点击搜索
			RequestF(url) {
				console.log(url);
				this.listHide = false
				this.texts = url
				this.shows =false
				uni.request({
					url: `https://apis.netstart.cn/music/search?keywords=${url}&limit=20`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						// console.log('歌曲搜索', data.data.result.songs)
						this.SearchList = data.data.result.songs
			
						if (this.history.indexOf(url) > -1) {
			
						} else {
							this.history.push(url)
							console.log(this.history);
						}
					}
				})
			},

			// 接受参数并 删除 历史记录 history 里面 的数据 
			DeleteList(text) {
				let index = this.history.indexOf(text)
				this.history.splice(index, 1)
				console.log('删除成功！', this.history);
			},

			// 懒加载
			loadmore() {
				this.shu += 10
				this.Rankings = this.Ranking.slice(0, this.shu)
			}
		},

		beforeMount() {
			this.RequestA();
			this.RequestB();
			this.RequestC();
			this.RequestD();
		}
	}
</script>

<style lang="scss" src="./home.scss">
</style>
