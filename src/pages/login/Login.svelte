<script>
	import Icon from 'svelte-awesome'
	import { replace } from 'svelte-spa-router'
	import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import Card from '../../components/card/Card.svelte'
	import Input from '../../components/form/Input.svelte'
	import setCookie from '../../utils/setCookie.js'

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
			fetch('http://localhost:5000/user/login', {
				body: JSON.stringify(values),
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			})
			.then(resp => {
				if(resp.status != 200) throw new Error(resp.status)
				return resp.json()
			})
			.then(json => {
				const accessToken = json.data.accessToken
				setCookie('access-token', accessToken)
				replace('/dashboard')
				return json
			})
			.catch(error => {
				console.log(error)
			})
			.finally(() => isLoading = false)
		}
	})

</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main class="h-screen w-screen flex justify-center items-center bg-base-200">
	<Card title="Login">
		<form on:submit={handleSubmit}>
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
