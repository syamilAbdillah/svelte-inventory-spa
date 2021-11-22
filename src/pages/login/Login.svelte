<script>
	import Icon from 'svelte-awesome'
	import { replace } from 'svelte-spa-router'
	import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
	import Card from '../../components/card/Card.svelte'
	import Input from '../../components/form/Input.svelte'

	let email
	let password

	const login = () => fetch('http://localhost:5000/user/login', {
		body: JSON.stringify({email, password}),
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	}).then(resp => {
		console.log(resp)
		return resp.json()
	})
	.then(json => {
		localStorage.setItem('auth-credential', JSON.stringify(json))
		replace('/dashboard')
		return json
	}).catch(error => {
		console.log(error)
	})
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main class="h-screen w-screen flex justify-center items-center bg-base-200">
	<Card title="Login">
		<Input label="email" bind:value={email} type="email" placeholder="eg. johndoe@email.com"></Input>
		<Input label="password" bind:value={password} type="password" placeholder="eg. p4$$WORD"></Input>
		<button class="btn btn-primary" on:click={login}>
			<Icon data={faSignInAlt} class="mr-4"></Icon>
			login
		</button>
	</Card>
</main>
