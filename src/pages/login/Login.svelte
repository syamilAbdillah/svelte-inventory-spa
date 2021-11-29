<script>
	import Icon from 'svelte-awesome'
	import { replace } from 'svelte-spa-router'
	import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import jwt_decode from 'jwt-decode'
	import axios from 'axios'
	import Card from '../../components/card/Card.svelte'
	import Input from '../../components/form/Input.svelte'
	import setCookie from '../../utils/setCookie'
	import {setAuthData} from './auth-store'

	let isLoading = false

	const { form, errors, handleSubmit, handleChange } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required()
		}),
		onSubmit: (values) => {
			isLoading = true
			axios.post(import.meta.env.VITE_BASEURL + '/user/login', values)
				.then(resp => {
					const refreshToken = resp.data.data.refreshToken
					const accessToken = resp.data.data.accessToken

					setAuthData(accessToken)
					setCookie('refresh-token', refreshToken)
					replace('/dashboard')
				})
				.catch(error => {
					console.log(error)
				})
				.then(() => isLoading = false)
		}
	})

	/**
	 *  TODO: 
	 * 		- ganti route guard ke refresh token ###
	 * 		- ganti smua fetch pake request.js
	 * 		- bikin store buat nympen accessToken ama user role 
	 * 		- bikin axios interceptor supaya auto refresh accesstoken setiap api call
	 * 		- bikin side bar nav link visible sesuai role setiap user
	 * 
	 * 
	 * */

</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main class="h-screen w-screen flex justify-center items-center bg-base-200">
	<Card title="Login">
		<form on:submit|preventDefault={handleSubmit}>
			<Input 
				bind:value={$form.email} 
				type="email" 
				placeholder="eg. johndoe@email.com"
				label="email"
				name="email"
				error={$errors.email} 
			/>
			<Input 
				bind:value={$form.password} 
				type="password" 
				placeholder="********"
				label="password"
				name="password"
				error={$errors.password} 
			/>
			<button class="btn btn-primary {isLoading ? 'loading': ''}" disabled={isLoading}>
				<Icon data={faSignInAlt} class="mr-4"/>
				login
			</button>
		</form>
	</Card>
</main>
