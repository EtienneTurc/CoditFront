<template>
	<div>
		<v-layout row wrap>
			<v-flex xs6>
				<v-menu
					v-model="date_menu"
					:close-on-content-click="true"
					:nudge-right="40"
					transition="scale-transition"
					offset-y
					min-width="290px"
				>
					<template v-slot:activator="{ on }">
						<v-text-field
							hide-details
							v-model="day"
							:label="label_date"
							prepend-icon="mdi-calendar"
							readonly
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker :min="min_day" v-model="day" @input="setDay" first-day-of-week="1"></v-date-picker>
				</v-menu>
			</v-flex>

			<v-flex xs6>
				<v-menu
					ref="menu"
					v-model="hours_menu"
					:close-on-content-click="false"
					:nudge-right="40"
					:return-value.sync="hours"
					transition="scale-transition"
					offset-y
					max-width="290px"
					min-width="290px"
				>
					<template v-slot:activator="{ on }">
						<v-text-field
							v-model="hours"
							:label="label_hours"
							prepend-icon="mdi-clock-outline"
							readonly
							v-on="on"
						></v-text-field>
					</template>
					<v-time-picker
						v-if="hours_menu"
						v-model="hours"
						format="24hr"
						@input="setHour"
						@click:minute="$refs.menu.save(hours)"
					></v-time-picker>
				</v-menu>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
export default {
	props: ["min_date", "init_date", "label_date", "label_hours"],
	data: function() {
		return {
			date_menu: false,
			hours_menu: false,
			day: "",
			hours: "",
			date: "",
			min_day: ""
		}
	},
	methods: {
		setHour(hour) {
			if (!this.date) this.date = new Date()
			hour = hour.split(":")
			let d = new Date(this.date)
			if (hour[0]) d.setHours(hour[0])
			if (hour[1]) d.setMinutes(hour[1])
			this.date = d
			this.$emit("time", this.date)
		},
		setDay(day) {
			if (!this.date) this.date = new Date()
			day = day.split("-")
			let d = new Date(this.date)
			d.setYear(day[0])
			d.setMonth(day[1] - 1)
			d.setDate(day[2])
			this.date = d
			this.$emit("time", this.date)
		},
		parseDate(iso_date) {
			let d = new Date(iso_date)
			d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
			d = d
				.toISOString()
				.replace(/T/, " ")
				.replace(/\..+/, "")
				.split(" ")
			return { day: d[0], hours: d[1].substring(0, d[1].length - 3) }
		}
	},
	watch: {
		date() {
			let d = this.parseDate(this.date)
			this.day = d.day
			this.hours = d.hours
		},
		init_date() {
			this.date = this.init_date
		},
		min_date() {
			if (!this.min_date) this.min_date = new Date()
			let d = this.parseDate(this.min_date)
			this.min_day = d.day
		}
	}
}
</script>
