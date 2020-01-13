<template>
	<v-container>
		<h2>Groupes</h2>
		<v-row align="center" justify="start" v-for="(groups, index) in groups_array" :key="index">
			<v-col
				align-self="start"
				md="4"
				v-for="(group,i) in groups"
				:key="group._id"
				style="z-index: 11;"
			>
				<group-card :group="group" @show="showExtension(index, i)" />
			</v-col>
			<v-col md="12" style="padding:0px;">
				<template v-for="(zoom,i) in zooms">
					<v-row justify="center" :key="'zoom' + i">
						<transition-group class="transition-group" :name="zoom">
							<group-card-expansion
								v-if="Math.floor(show/3)==index && show%3==i"
								:key="index"
								:group="groups_array[index][i]"
							></group-card-expansion>
						</transition-group>
					</v-row>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import GroupCard from "@/components/GroupCard.vue"
import GroupCardExpansion from "@/components/GroupCardExpansion.vue"
import utils from "@/utils/utils"

export default {
	data: () => {
		return {
			groups_array: [],
			show: -1,
			zooms: ["zoomLeft", "zoom", "zoomRight"]
		}
	},
	components: {
		"group-card": GroupCard,
		"group-card-expansion": GroupCardExpansion
	},
	created() {
		this.getGroups()
	},
	methods: {
		async getGroups() {
			try {
				let res = await this.$http.get(
					process.env.VUE_APP_API_URL + "/groups"
				)
				res.data = res.data.concat(res.data)
				res.data = res.data.concat(res.data)
				res.data = res.data.concat(res.data)
				res.data = res.data.concat(res.data)
				this.groups_array = []
				for (let index = 0; index < res.data.length; index += 3) {
					this.groups_array.push(res.data.slice(index, index + 3))
				}
			} catch (error) {
				utils.handle(this, error)
			}
		},
		showExtension(index, i) {
			let show = index * 3 + i
			this.show = show == this.show ? -1 : show
		}
	}
}
</script>

<style>
.subtitle {
	color: grey;
}

.transition-group {
	width: 100%;
}

.zoomLeft-enter-active {
	animation: zoomLeft-in 0.5s;
}
.zoomLeft-leave-active {
	animation: zoomLeft-in 0.5s reverse;
}

@keyframes zoomLeft-in {
	from {
		left: -30%;
		opacity: 0;
		-webkit-transform: scale3d(0, 0, 0);
		transform: scale3d(0, 0, 0);
		margin-top: -30%;
		margin-bottom: -30%;
	}

	100% {
		opacity: 1;
		left: 0%;
	}
}

.zoomRight-enter-active {
	animation: zoomRight-in 0.5s;
}
.zoomRight-leave-active {
	animation: zoomRight-in 0.5s reverse;
}

@keyframes zoomRight-in {
	from {
		right: -30%;
		opacity: 0;
		-webkit-transform: scale3d(0, 0, 0);
		transform: scale3d(0, 0, 0);
		margin-top: -30%;
		margin-bottom: -30%;
	}

	100% {
		opacity: 1;
		right: 0%;
	}
}

.zoom-enter-active {
	animation: zoom-in 0.5s;
}
.zoom-leave-active {
	animation: zoom-in 0.5s reverse;
}

@keyframes zoom-in {
	from {
		opacity: 0;
		-webkit-transform: scale3d(0, 0, 0);
		transform: scale3d(0, 0, 0);
		margin-top: -30%;
		margin-bottom: -30%;
	}

	100% {
		opacity: 1;
	}
}
</style>
