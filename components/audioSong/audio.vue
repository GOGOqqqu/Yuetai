<template>
	<view class="audios">
			<!-- :class="controls == true ? 'ar' : 'al'" -->
			<audio v-show="controls" ref="jia" @click="ControlSong" @ended="endedSong"
				:poster="deliveredContent.picture" @timeupdate="listTimeupdate" :author="deliveredContent.author"
				:name="deliveredContent.title" class="audioSong"
				:src="`https://music.163.com/song/media/outer/url?id=${SongId}.mp3`" controls></audio>
			<view class="hong" @click="hongControl"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.audios {
			
			width: 100%;
			height: 130rpx;
			display: flex;
			position: absolute;
			top: 0;
			left: 0;

			.audioSong {
				// text-align: center;
				transition: all .3s linear;
			}

			.hong {
				display: none;
				width: 0px;
				height: 0px;
				margin-top: 30rpx;
				margin-left: 10rpx;
				border: 40rpx solid;
				// border-color: red yellow green blue;
				border-color: transparent transparent transparent green;
			}

			.al {
				display: block;
				transform: translateX(0px);
				transition: all .3s linear;
			}

			.ar {
				// display: block;
				transform: translateX(-300px);
				// display: none;
				transition: all .3s linear;
				// display: none;
			}
		}
		
</style>
