<template>
	<div id="recommend">
		<div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "HomeRecommendView",
		props: {
			recommends: {
				type: Array,
				default() {
					return []
				}
			}
		}
	}
</script>

<style scoped>
	#recommend {
		display: flex;
		width: 100%;
		font-size: 12px;
		text-align: center;

		padding: 15px 0 20px;
		border-bottom: 8px solid #eee;
	}

	.recommend-item {
		flex: 1;
	}

	.recommend-item img {
		width: 65px;
		height: 65px;
	}
</style>
