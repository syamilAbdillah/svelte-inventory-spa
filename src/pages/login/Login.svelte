<script>
	import Icon from 'svelte-awesome'
	import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
	import Card from '../../components/card/Card.svelte'
	import Input from '../../components/form/Input.svelte'
	import { login } from '../../stores/auth.js'

	let email
	let password	
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main class="h-screen w-screen flex justify-center items-center bg-base-200">
	<Card title="Login">
		<Input label="email" bind:value={email} type="email" placeholder="eg. johndoe@email.com"></Input>
		<Input label="password" bind:value={password} type="password" placeholder="eg. p4$$WORD"></Input>
		<button class="btn btn-primary" on:click={() => login(email, password)}>
			<Icon data={faSignInAlt} class="mr-4"></Icon>
			login
		</button>
	</Card>
</main>
