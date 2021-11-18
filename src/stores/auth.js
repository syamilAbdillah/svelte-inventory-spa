import { writable } from 'svelte/store'

export const isAuthenticated = writable(false)
export const login = (email, password) => {
	email == 'syamil@test.com' && password == 'test' && isAuthenticated.update(() => true)
}