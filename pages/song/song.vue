<!-- 音乐播放页 -->
<template>
	<view class="ge">
		<view class="picture" @click="ControlSong">
			<view class="picture-img">
				<image class="img-img" :src="deliveredContent.picture" mode=""></image>
			</view>
			<view class="chang" :class="controlRecord == true ? 'paused': ''"> </view>

		</view>
		<view class="audios">
			<!-- :class="controls == true ? 'ar' : 'al'" -->
			<audio v-show="controls" ref="jia" @click="ControlSong" @ended="endedSong"
				:poster="deliveredContent.picture" @timeupdate="listTimeupdate" :author="deliveredContent.author"
				:name="deliveredContent.title" class="audioSong"
				:src="`https://music.163.com/song/media/outer/url?id=${SongId}.mp3`" controls></audio>
			<view class="hong" @click="hongControl"></view>
		</view> 

		<!-- 底部的 进度条 -->
		<view class="bottom">
			<view class="">
				{{currentTimeSong}}
			</view>
			<slider class="tiao" ref="tiao" :value="valueTime" @change="sliderChange" activeColor="#fff"
				backgroundColor="#000" block-color="#8A6DE9" block-size="20" />
			<view class="">
				{{durationTime}}
			</view>
		</view>

		<!-- <p>{{ message | capi }}</p> -->

		<!-- {{ lyrics }} -->
		<u-popup class="nei" :show="show" @close="close" @open="open">
			<view class="baise">
				<view class="bai"></view>
			</view>
			<view class="tou">
				<view class="tou1" :class="musics == true ? 'reds' : ''" @click="attrsAdd(0)">相似歌曲</view>
				<view class="tou1" :class="musics == false ? 'reds' : ''" @click="attrsAdd(1)"> 精彩评论</view>
			</view>
			<!-- / :class="chun == true ? 'ac' :'active'" -->
			<view class="comments" key="jjj">
				<view class="comment1" v-for="(item,index) in comments" :key="index">
					<view class="comment1-top">
						<view class="top">
							<image class="img" :src="item.user.avatarUrl"></image>
						</view>
						<view class="content">
							<view class="content-top">{{item.user.nickname}}</view>
							<view class="content-bottom">{{ $u.timeFormat(item.time, 'yyyy年mm月dd日' )}}</view>

						</view>
						<view class="bottom">
							<view class="">
								{{item.likedCount}}
							</view>
							<view class="actives" @click="DisplayHide" :data-index="item.time"
								:ref="`index${item.time}`">
								<svg t="1669220831003" class="icon da" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="11837" width="16" height="16">
									<path
										d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
										p-id="11838" fill="#cdcdcd"></path>
								</svg>
							</view>
							<view class="active" @click="DisplayHides" :data-index="item.time + 0"
								:ref="`index${item.time + 0}`">
								<svg t="1669220625177" class="icon da" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="8341" width="16" height="16">
									<path
										d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
										p-id="8342" fill="#d81e06"></path>
								</svg>
							</view>

						</view>
					</view>
					<view class="comment1-bottom">
						{{item.content}}

					</view>

				</view>

			</view>
			<view>
				<text>出淤泥而不染，濯清涟而不妖</text>
			</view>
		</u-popup>
		<!-- 		<view class="pl" @click="show = true">
			<svg t="1669639534900" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
				p-id="3606" width="25" height="25">
				<path
					d="M511.994883 72.369238c-247.680009 0-448.463941 173.087127-448.463941 386.607128 0 309.905212 278.361799 367.348506 448.463941 492.654396C693.15078 799.811008 960.469058 773.300214 960.469058 458.976366 960.469058 245.456365 759.677962 72.369238 511.994883 72.369238L511.994883 72.369238 511.994883 72.369238zM301.32786 559.805796c-50.467415 0-91.37101-40.909735-91.37101-91.37101 0-50.462299 40.903595-91.367941 91.37101-91.367941 50.461275 0 91.37101 40.905642 91.37101 91.367941C392.699893 518.89606 351.789135 559.805796 301.32786 559.805796L301.32786 559.805796 301.32786 559.805796zM528.080234 559.805796c-50.462299 0-91.367941-40.909735-91.367941-91.37101 0-50.462299 40.905642-91.367941 91.367941-91.367941 50.461275 0 91.37101 40.905642 91.37101 91.367941C619.451244 518.89606 578.541509 559.805796 528.080234 559.805796L528.080234 559.805796 528.080234 559.805796zM745.378282 559.805796c-50.467415 0-91.373057-40.909735-91.373057-91.37101 0-50.462299 40.910759-91.367941 91.373057-91.367941 50.461275 0 91.372034 40.905642 91.372034 91.367941C836.749292 518.89606 795.838533 559.805796 745.378282 559.805796L745.378282 559.805796 745.378282 559.805796zM745.378282 559.805796"
					p-id="3607" fill="#dbdbdb"></path>
			</svg>
		</view> -->
		<view class="lyricsList">
			<view class="changs" ref="SongTimeDate" @mousewheel="scrollChange">
				<view class="lyricsList-content" v-for="(item,index) in lyrics" :key="index"
					:class="currentIndex == index ? 'red' : ''" @click="Clicklyrics(index)">
					{{item.lrc}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				SongId: '', // 歌曲id
				controlRecord: false,
				audioLength: '',
				playing: false,
				message: "hello vue.js",
				deliveredContent: '', // 传送过来的数据
				lyrics: [], //歌词
				controls: false,
				currentTime: '', //播放时间段
				currentTimeSong: '00:00', //处理过的播放时间段
				duration: '', // 音乐总时长
				durationTime: '', // 处理过的音乐总时长
				valueTime: '', // 滚动条长度
				currentIndex: 0, // 高亮歌词 第几首
				songHeight: [], // 歌词高度
				show: false,
				comments: '', // 歌曲评论 
				commentss: '', // 相似歌曲 
				musics: true, // 控制
			}
		},
		computed: {
			arrayLists: function() {
				return this.$store.getters.getArrayList
			}
		},
		watch: {
			// 监听 currentTime 播放时间段
			currentTime: function() {
				this.TuHn();
				this.TimeData();
				let gao = document.querySelectorAll('.lyricsList-content')
				let gaos = document.querySelector('.lyricsList-content.red')
				let changs = document.querySelector('.changs')

				this.valueTime = Math.floor(this.currentTime * 100 / this.duration) || 0

				for (let i = 0; i < this.lyrics.length; i++) {
					// 找到  this.lyrics[i].time 进行判断
					let time = this.lyrics[i].time
					// 如果小于 当前音乐播放的时间  并且  当前音乐播放的时间  小于 this.lyrics[i].time的time 
					if (i + 1 == this.lyrics.length || (this.currentTime >= time && this.currentTime < this.lyrics[i +
							1].time)) {
						this.currentIndex = i
						break
					}
				}
				if (this.currentTime == this.duration) {
					this.currentIndex = 0
				}
			},

			//监听 currentIndex 那段歌词 高亮
			currentIndex: function() {
				console.log('currentIndex发生变化', this.currentIndex);
				let gao = document.querySelector('.lyricsList-content')
				let gaos = document.querySelector('.lyricsList-content.red')
				let changs = document.querySelector('.changs')
				let time2 = this.lyrics.length - 7
				// if(time2)
				console.log(time2);
				if (this.currentIndex > 0) {
					if (this.songHeight.length > 0) {
						changs.style.top = '-' + this.songHeight[0] + 'px'
						// 获取高亮歌词的 高度
						let heights = gaos.clientHeight
						let addHeight = this.songHeight[0] + heights
						this.songHeight = []
						this.songHeight.push(addHeight)
						console.log('监听里面的歌词高度', this.songHeight);
					} else {
						let a = gaos.clientHeight
						this.songHeight.push(a)
						console.log('监听里面的第一次添加', this.songHeight);
					}
				}
			},


		},

		methods: {
			scrollChange(e) {
				// let changs = document.querySelector('.changs')
				// changs.style.top = e.mp.target.offsetTop + 'px'
				console.log('滚动中',e.mp.target.offsetTop)
				
			},
			attrsAdd(index) {
				if (index == 0) {
					this.musics = true
				} else if (index == 1) {
					this.musics = false
				}
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			hongControl() {
				if (this.controls) {
					this.controls = false
				} else {
					this.controls = true
					// console.log(this.$refs.jia);
				}
			},

			MnMn(e) {
				console.log(e.scrollTop);
			},
			// 获取歌曲总时长 并且就其转换
			TuHn() {
				let audio = document.querySelector('audio');
				this.duration = audio.duration
				let time1 = Math.floor(this.duration)
				let t1 = time1 % 60
				let t2 = (time1 - t1) / 60
				t2 = t2 > 10 ? t2 : '0' + t2
				let t11 = t1 > 10 ? t1 : '0' + t1
				let shi = t2 + ':' + t11
				this.durationTime = shi

			},
			// 获取 播放时间
			TimeData() {
				let time11 = Math.floor(this.currentTime)
				if (time11 > 60) {
					let t11 = time11 % 60
					let t21 = (time11 - t11) / 60
					t21 = t21 > 10 ? t21 : '0' + t21
					let t111 = t11 > 9 ? t11 : '0' + t11
					let shi1 = t21 + ':' + t111
					this.currentTimeSong = shi1
				} else if (time11 < 60 && time11 > 10) {
					let shi32 = '00' + ':' + time11
					this.currentTimeSong = shi32
				} else if (time11 < 10) {
					let shi32 = '00' + ':' + '0' + time11
					this.currentTimeSong = shi32
				}
			},

			// 获取 音乐时长 信息
			listTimeupdate() {
				let audio = document.querySelector('audio');
				this.currentTime = audio.currentTime
				// this.currentTimeSong = audio.duration
				console.log('播放进度', this.currentTime);
				let geci = this.lyrics

			},
			// 点击歌词 切换 高亮歌词，进度条，音频进度
			Clicklyrics(index) {
				let gao = document.querySelectorAll('.lyricsList-content')
				let audio = document.querySelector('audio')
				let changs = document.querySelector('.changs')
				// 转换为数组
				let ar = Array.from(gao)
				// 清空this.songHeight
				this.songHeight = []
				this.currentIndex = index
				// 进度条 valueTime
				this.valueTime = Math.floor(this.currentTime * 100 / this.duration) || 0
				audio.currentTime = this.lyrics[index].time
				let intercept = ar.slice(0, (index - 1))
				let time2 = index - 7
				index = (index - 7) > 0 ? index - 7 : index
				if (index > 0) {

					for (let b = 0; b < intercept.length; b++) {
						let gao1 = intercept[b].clientHeight
						if (b > 0) {
							// 获取高亮歌词的 高度
							let heights = intercept[b].clientHeight
							let addHeight = this.songHeight[0] + heights
							this.songHeight = []
							this.songHeight.push(addHeight)
							console.log('拖拉滚动条的歌词高度', this.songHeight);
						} else {
							let a = intercept[b].clientHeight
							this.songHeight.push(a)
							console.log('拖拉滚动条的第一次添加', this.songHeight);
						}
					}
				}
				if (index == 1) {
					changs.style.top = 0 + 'px'
				}

				console.log(index);
			},
			// 拖拉 滚动条
			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
				let audio = document.querySelector('audio')
				let gao = document.querySelectorAll('.lyricsList-content')
				let changs = document.querySelector('.changs')
				// 转换为数组
				let ar = Array.from(gao)
				// 清空this.songHeight
				this.songHeight = []
				audio.currentTime = e.detail.value * this.duration / 100
				this.currentTime = audio.currentTime
				this.TimeData();

				let length = this.lyrics.length - 7 > 0 ? this.lyrics.length - 7 : this.lyrics.length
				for (let i = 0; i < this.lyrics.length; i++) {
					// 找到  this.lyrics[i].time 进行判断
					let time = this.lyrics[i].time
					// 如果小于 当前音乐播放的时间  并且  当前音乐播放的时间  小于 this.lyrics[i].time的time 
					if (i + 1 == this.lyrics.length || (this.currentTime >= time && this.currentTime < this.lyrics[i +
							1].time)) {
						this.currentIndex = i
						let intercept = ar.slice(0, i)
						for (let b = 0; b < intercept.length; b++) {
							let gao1 = intercept[b].clientHeight
							if (b > 0) {
								// 获取高亮歌词的 高度
								let heights = intercept[b].clientHeight
								let addHeight = this.songHeight[0] + heights
								this.songHeight = []
								this.songHeight.push(addHeight)
								console.log('拖拉滚动条的歌词高度', this.songHeight);
							} else {
								let a = intercept[b].clientHeight
								this.songHeight.push(a)
								console.log('拖拉滚动条的第一次添加', this.songHeight);
							}
						}
						if (length > 7) {

						}
						if (length)
							changs.style.top = '-' + this.songHeight[0] + 'px'
						break
					}

				}
				if (e.detail.value == 0) {
					changs.style.top = 0 + 'px'
					this.currentIndex = 0

				}
			},
			//歌词 评论  https://apis.netstart.cn/music/comment/music?id=186016
			songComment() {
				uni.request({
					// url: `https://apis.netstart.cn/music/comment/playlist?id=${this.id}`,
					url: `https://apis.netstart.cn/music/comment/music?id=${this.SongId}&limit=10`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						console.log('歌曲评论请求', data.data.comments)
						this.comments = data.data.comments
						// this.music= this.RankingSong.tracks.slice(0,10);
						// console.log(this.RankingSong);
					}
				})
			},
			// 相似 歌曲 https://apis.netstart.cn/music/simi/song?id=347230&limit=15
			songComments() {
				uni.request({
					// url: `https://apis.netstart.cn/music/comment/playlist?id=${this.id}`,
					url: `https://apis.netstart.cn/music/comment/music?id=${this.SongId}&limit=6`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						console.log('相似 歌曲', data.data.comments)
						this.commentss = data.data.comments
						// this.music= this.RankingSong.tracks.slice(0,10);
						// console.log(this.RankingSong);
					}
				})
			},
			// 歌词 请求 lyric?id=
			lyricRequest() {
				uni.request({
					// url: `https://apis.netstart.cn/music/comment/playlist?id=${this.id}`,
					url: `https://apis.netstart.cn/music/lyric?id=${this.SongId}`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						console.log('歌词请求', data.data.lrc)
						// this.lyrics = data.data.lrc.lyric
						this.renderLrcListItem(data.data.lrc.lyric)
						// console.log(this.RankingSong);
					}
				})
			},
			// 音乐播放末尾
			endedSong() {
				let disc = document.querySelector('.picture-img')
				disc.style.animationPlayState = 'paused'
				let audio = document.querySelector('audio');
				let changs = document.querySelector('.changs')
				changs.style.top = 0 + 'px'
				this.currentIndex = 0
				console.log(this.currentIndex);
				this.songHeight = []
				audio.currentTime = 0
				this.duration = audio.duration
				this.controlRecord = false
				this.currentTime = '00：00'
				this.currentTimeSong = '00:00'
			},

			// 控制 音乐的播放 与 暂停
			ControlSong(e) {
				this.playing = !this.playing
				let disc = document.querySelector('.picture-img')
				let audio = document.querySelector('audio')
				if (!this.playing) { // 暂停
					disc.style.animationPlayState = 'paused'
					this.controlRecord = false
					audio.pause()
				} else { // 播放
					this.controlRecord = true
					disc.style.animationPlayState = 'running'
					audio.play()
				}
			},

			// 解析歌词
			renderLrcListItem(lyric) {

				// console.log(lyric);

				// let lrcListUl = document.querySelector('.lrc-list')
				// // 清空上一次的歌词
				// lrcListUl.innerHTML = ''
				// // 清空上一次歌词对应的li
				// lrcListItems = []
				this.lyrics = []
				let lycReg = /^\[(\d+):(\d+\.\d+)\]([\S ]+)$/igm
				console.log(lycReg.test(lyric));


				while (lycReg.test(lyric)) {

					this.lyrics.push({
						time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
						lrc: RegExp.$3
					})
				}
				console.log('歌词解析完成')
			}
		},
		created() {
			this.lyricRequest();
			this.TuHn();
			this.songComment();
			this.songComments();
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数

			let data = JSON.parse(decodeURIComponent(option.id))
			console.log('打印出上个页面传递的参数', data.id); //打印出上个页面传递的参数。
			this.SongId = data.id
			this.deliveredContent = data
			console.log('data', data);
		}
	}
</script>

<style lang="scss" lang="scss" src="./song.scss">
	

	//  一个一个的将歌曲添加到 Vuex 上面， 歌单 页 可以选择 全部 音乐的 id 或者单首歌曲 的id 添加 Vuex 上面 
	//  步骤 - 歌单页 先把歌单页的全部 音乐的id 拿出来 可以使用过滤器 filter  把 需要 用的 id
	//         全部添加 进去一个数组 里面 然后 rturn 出来
</style>
