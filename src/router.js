import VueRouter from 'vue-router'

import Exercises from "@/components/Exercises";
import AddExercise from "@/components/AddExercise";

const router = new VueRouter({
	routes: [
		{
			path: '/exercises',
			name: 'exercises',
			component: Exercises
		},
		{
			path: '/addExercise',
			name: 'addExercise',
			component: AddExercise
		}
	],
	mode: "history"
})

export default router;
