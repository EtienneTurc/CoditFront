import VueRouter from 'vue-router'

import Home from "@/components/Home";
import Exercise from "@/components/Exercise";
import Exercises from "@/components/Exercises";
import AddExercise from "@/components/AddExercise";

const router = new VueRouter({
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: '/exercises',
			name: 'exercises',
			component: Exercises
		},
		{
			path: '/exercise/:id',
			name: 'exercise',
			component: Exercise
		},
		{
			path: '/addExercise',
			name: 'addExercise',
			component: AddExercise
		},
	],
	mode: "history"
})

export default router;
