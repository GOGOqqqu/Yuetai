<template>
	<view class="imt-audio">
		<view class="rotateBox rotatebox" :style="{animationPlayState:paused?'paused':'running'}">
			<img src="https://music.163.com/song/media/outer/url?id=430062600.mp3" alt="" />
		</view>
		<view class="audio-wrapper">
			<view class="audio-number" style="margin-right:13rpx">{{ format(current) }}</view>
			<u-slider
				v-model="slideWidth"
				@moving="moveing"
				@end="endMove"
				:disabled="loading"
				style="width:524rpx"
				:block-width="12"
				block-color="#FFE100"
				:height="2"
				inactive-color="#c4c4c4"
				:unidirectionalDatatTransfer="true"
                active-color='#FFE100'
			></u-slider>
			<view class="audio-number" style="margin-left:13rpx">{{ format(duration) }}</view>
		</view>
		<view class="audio-control-wrapper" :style="{ color }">
			<view class="audio-control audio-control-prev iconfont icon-bofangqi_shangyizhenbeifen" v-if="control" :style="{ borderColor: color,fontSize:'61rpx' }" @click="prev"></view>
			<view class="audio-control audio-control-switch" :class="{ audioLoading: loading }" @click="audio.paused ? play() : audio.pause()">
                <text class="iconfont" :class="loading ? ' icon-jiazai' : paused ? ' icon-bofangqi-bofang_' : ' icon-bofangqi-zanting'" style="font-size:146rpx"></text>
            </view>
			<view class="audio-control audio-control-next iconfont icon-bofangqi_xiayizhenbeifen" v-if="control" :style="{ borderColor: color,fontSize:'61rpx' }" @click="next"></view>
		</view>
	</view>
</template>
 
<script>
export default {
	data() {
		return {
			audio: uni.createInnerAudioContext(),
			current: 0, //当前进度(s)
			duration: 0, //总时长(s)
			paused: true, //是否处于暂停状态
			loading: false, //是否处于读取状态
			seek: false, //是否处于拖动状态
			slideWidth: 0,
		}
	},
	props: {
		src: String, //音频链接
		autoplay: Boolean, //是否自动播放
		continue: Boolean, //播放完成后是否继续播放下一首，需定义@next事件
		control: {
			type: Boolean,
			default: true,
		}, //是否需要上一曲/下一曲按钮
		color: {
			type: String,
			default: '#C4C4C4',
		}, //主色调
	},
	methods: {
		endMove() {
			this.play()
			const pr = (this.slideWidth / 100) * this.duration
			// this.current = pr
			this.audio.seek(pr)
		},
		moveing() {
			this.play()
			this.seek = true
			const pr = (this.slideWidth / 100) * this.duration
			this.current = pr
			console.log(this.seek)
		},
		//返回prev事件
		prev() {
			this.slideWidth = 0
			this.$emit('prev')
		},
		//返回next事件
		next() {
			this.slideWidth = 0
			this.$emit('next')
		},
		//格式化时长
		format(num) {
			return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(num % 60)).length) + Math.floor(num % 60)
		},
		//点击播放按钮
		play() {
			this.audio.play()
			// this.loading = true
		},
	},
	created() {
		if (this.src) {
			this.audio.src = this.src
			this.autoplay && this.play()
		}
		this.audio.obeyMuteSwitch = false
		//音频进度更新事件
		this.audio.onTimeUpdate(() => {
			// console.log('音频进度条发生更新')
			if (!this.seek) {
				// console.log('重新更新')
				this.current = this.audio.currentTime
			}
			if (!this.duration) {
				this.duration = this.audio.duration
			}
		})
		//音频播放事件
		this.audio.onPlay(() => {
			// console.log('音频播放')
			this.paused = false
			this.loading = false
			console.log(this.audio.duration)
		})
		//音频暂停事件
		this.audio.onPause(() => {
			this.paused = true
		})
		//音频结束事件
		this.audio.onEnded(() => {
			// console.log('音频结束')
			if (this.continue) {
				this.next()
			} else {
				this.paused = true
				this.current = 0
			}
		})
		//音频完成更改进度事件
		this.audio.onSeeked(() => {
			// console.log('音频进度条完成')
			this.seek = false
			this.$forceUpdate()
		})
		//微信基础库不同,必须监听这个,并且输出这个值,上面的 onTimeUpdate才会触发,不知道啥情况
		this.audio.onCanplay(() => {
			this.loading = false
			console.log(this.audio.duration, '音频能够播放了')
		})
 
		this.audio.onWaiting(() => {
			// console.log('XXXX')
			this.loading = true
			console.log(this.audio.duration)
		})
	},
	beforeDestroy() {
		this.audio.destroy()
	},
	watch: {
		src(src, old) {
			this.audio.src = src
			this.slideWidth = 0
			this.current = 0
			this.duration = 0
			if (old || this.autoplay) {
				this.play()
			}
		},
		current(value) {
			if (this.duration > 0) {
				if (this.current === this.duration) {
					this.slideWidth = 100
					return
				}
				// this.slideWidth = parseInt(((parseInt(value) / parseInt(this.duration)) * 100).toFixed(2))
				this.slideWidth = Number(((value / this.duration) * 100).toFixed(4))
			}
		},
	},
}
</script>
 


<style>

</style>
