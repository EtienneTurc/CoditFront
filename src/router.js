import VueRouter from 'vue-router'

import Home from "@/components/Home";
import Login from "@/components/Login";
import AddGroup from "@/components/Group/AddGroup";
import UpdateGroup from "@/components/Group/UpdateGroup";
import Groups from "@/components/Group/Groups";
import Exercise from "@/components/Exercise/Exercise";
import Exercises from "@/components/Exercise/Exercises";
import AddExercise from "@/components/Exercise/AddExercise";
import UpdateExercise from "@/components/Exercise/UpdateExercise";

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
			path: '/addGroup',
			name: 'addGroup',
			component: AddGroup
		},
		{
			path: '/updateGroup/:id',
			name: 'updateGroup',
			component: UpdateGroup
		},
		{
			path: '/groups',
			name: 'groups',
			component: Groups
		},
		{
			path: '/exercises',
			name: 'exercises',
			component: Exercises
		},
		{
			path: '/exercises/:id',
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

router.beforeEach((to, from, next) => {
	if (to.path == "/") {
		next("/groups")
	}
	next()
})

export default router;
