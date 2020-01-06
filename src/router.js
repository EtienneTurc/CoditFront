import VueRouter from 'vue-router'

import Home from "@/components/Home";
import Login from "@/components/Login";
import Exercise from "@/components/Exercise";
import Exercises from "@/components/Exercises";
import AddExercise from "@/components/AddExercise";
import UpdateExercise from "@/components/UpdateExercise";

const router = new VueRouter({
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: '/exercises',
			name: 'exercises',
			component: Exercises
		},
		{
			path: '/exercise/:id',
			name: 'exercise',
			component: Exercise,
		},
		{
			path: '/addExercise',
			name: 'addExercise',
			component: AddExercise
		},
		{
			path: '/updateExercise/:id',
			name: 'updateExercise',
			component: UpdateExercise
		},
	],
	mode: "history"
})

export default router;
