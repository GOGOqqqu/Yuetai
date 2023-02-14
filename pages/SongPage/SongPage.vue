<!-- 编辑推荐 歌单页 -->
<template>
	<view class="song">
		<!-- 歌单页头部 -->
		<view class="head">
			<view class="head-left">
				<image class="img" :src="RankingSong.coverImgUrl" mode=""></image>
			</view>
			<view class="head-right">
				<view class="right-top">{{ RankingSong.name }}</view>
				<view class="right-bottom">
					<image class="img6" :src="RankingSong.creator.avatarUrl" mode=""></image>
					<view class="text">{{RankingSong.creator.signature}}</view>
				</view>
			</view>

		</view>

		<view class="song-list"> 歌曲列表 </view>
		<!-- 歌曲列表 -->
		<view class="recommend-text1">
			<view class="newests" v-for="(item,index) in music" :key="item.id" @click="ClickSong(item)">

				<view class="newests-left">{{index + 1}}</view>
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
		</view>

		<view class="jia">
			<view v-if="hide">点击加载更多</view>
			<view v-if="!hide">没有更多了</view>
			<view class="m1" v-if="hide" @click="ClickA(0)"></view>
			<view class="m2" v-if="!hide" @click="ClickA(1)"></view>
		</view>
		<view class="comment">
			<view class="comment-left" :class="chun == true ? 'chun' :''" @click="SwitchComments(0)">
				精彩评论
			</view>
			<view class="comment-right" :class="chun == false ? 'chun' :''" @click="SwitchComments(1)">
				最新评论
			</view>
		</view>
		<view class="comments" :class="chun == true ? 'ac' :'active'" key="jjj">
			<view class="comment1" v-for="(item,index) in hotComments" :key="index">
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
						<view class="actives" @click="DisplayHide" :data-index="item.time" :ref="`index${item.time}`">
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
		
		<view class="hot-comments" :class="chun == false ? 'ac' :'active'" key="xjjj">
			<view class="comment1" v-for="(item,index) in comment" :key="index">
				<view class="comment1-top">
					<view class="top">
						<image class="img" :src="item.user.avatarUrl"></image>
					</view>
					<view class="content">
						<view class="content-top">{{item.user.nickname}}</view>
						<view class="content-bottom"> {{ $u.timeFormat(item.time, 'yyyy年mm月dd日' )}}</view>
					</view>
					<view class="bottom">
						<view>
							{{item.likedCount}}
						</view>
						<view class="actives" @click="DisplayHide" :data-index="item.time" :ref="`index${item.time}`">
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
	</view>
</template>

<script>
	import common from '../../common/js/common.js'
	export default {
		data() {
			return {
				id: '',
				ids: '',
				name:'',
				RankingSong: '', // 传输的歌单的音乐数据
				music: '', // 音乐长度
				loading: true,
				hide: true,
				hotComments: '', //热门评论
				comment: '', // 最新评论
				chun: true // 切换评论
			}
		},
		computed: {

		},
		methods: {
			// 歌单请求 https://apis.netstart.cn/music/comment/playlist?id=
			RequestSongs() {
				uni.request({
					url: `https://apis.netstart.cn/music/playlist/detail?id=${this.id}`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						console.log('歌单页请求', data.data.playlist)
						this.RankingSong = data.data.playlist
						this.music = this.RankingSong.tracks.slice(0, 10);
						// console.log(this.RankingSong);
					}
				})
			},

			// 获取评论
			RequestComment() {
				uni.request({
					// url: `https://apis.netstart.cn/music/comment/playlist?id=${this.id}`,
					url: `https://apis.netstart.cn/music/comment/playlist?id=${this.ids}`,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: data => {
						// console.log('评论请求', data.data)
						this.comment = data.data.comments
						this.hotComments = data.data.hotComments
						// this.music= this.RankingSong.tracks.slice(0,10);
						// console.log(this.RankingSong);
					}
				})
			},

			// 点赞功能 
			DisplayHide(e) {
				let SongId = 'index' + e.target.dataset.index
				this.$refs[SongId][0].$el.style.display = 'none'
				this.$refs[SongId][0].$el.parentElement.style.color = 'red'
				this.$refs[SongId][0].$el.nextElementSibling.style.display = 'block'
				let number = Number(this.$refs[SongId][0].$el.parentElement.firstElementChild.innerHTML) + 1
				this.$refs[SongId][0].$el.parentElement.firstElementChild.innerHTML = number
			},
			// 点取消赞功能
			DisplayHides(e) {
				let SongId = 'index' + e.target.dataset.index
				console.log(this)
				this.$refs[SongId][0].$el.style.display = 'block'
				this.$refs[SongId][0].$el.parentElement.style.color = '#999999'
				this.$refs[SongId][0].$el.nextElementSibling.style.display = 'none'
				let number = Number(this.$refs[SongId][0].$el.parentElement.firstElementChild.innerHTML) - 1
				this.$refs[SongId][0].$el.parentElement.firstElementChild.innerHTML = number
			},

			SwitchComments(el) {
				if (el == 0) {
					this.chun = true
				} else {
					this.chun = false
				}
			},
			// 跳转到听歌页面
			ClickSong(str) {
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

			// 控制歌曲懒加载
			ClickA(el) {
				if (el == 0) {
					this.hide = false
					this.music = this.RankingSong.tracks.slice(0, this.RankingSong.length);
				} else {
					this.hide = true
					this.music = this.RankingSong.tracks.slice(0, 10);
				}
			}
		},
		onLoad() {
			// this.time = uni.$u.timeFormat(this.timestamp, 'yyyy-mm-dd');
		},
		beforeMount() {
			this.RequestSongs();
			this.RequestComment();
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log('歌曲id', option.id); //打印出上个页面传递的参数。
			console.log('歌曲id', option.name); //打印出上个页面传递的参数。
			this.id = option.id
			this.ids = option.id
			this.name = option.name
		}
	}
</script>

<style lang="scss" src="./SongPage.scss">

</style>
