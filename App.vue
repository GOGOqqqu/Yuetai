@import 'uview-ui/theme.scss';
<!-- <template>
	<view class="">
			<!-- <audioSong></audioSong> -->
	<!-- </view>

</template> --> -->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onShareAppMessage() {
			console.log(ss);
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";    

</style>
