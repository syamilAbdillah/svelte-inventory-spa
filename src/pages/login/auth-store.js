import { writable, get } from 'svelte/store'
import jwt_decode from 'jwt-decode'

export const authStore = writable({})

export function getAuthData(){
	return get(authStore)
}

export function setAuthData(accessToken){
	const authData = jwt_decode(accessToken)
	authStore.set({...authData, accessToken})

	return authData
}

export function resetAuthData(){
	authStore.set({})
}