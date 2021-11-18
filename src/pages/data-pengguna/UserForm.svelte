<script>
	import { createEventDispatcher } from 'svelte'
	import Card from '../card/Card.svelte'
	import Input from '../form/Input.svelte'
	import Select from '../form/Select.svelte'
	import SaveButton from '../form/SaveButton.svelte'
	import UpdateButton from '../form/UpdateButton.svelte'
	import CancelButton from '../form/CancelButton.svelte'

	import { user, state, handleCreate, handleCancle, handleUpdate } from '../../stores/user.js'


	const dispatch = createEventDispatcher()

	const options = [
		{ id: 'admin', 		text: 'admin' 			},
		{ id: 'super admin', text: 'super admin' 	},
		{ id: 'gudang', 		text: 'gudang' 		}
	]

	const dispatchCreate = () => dispatch('create')
	const dispatchUpdate = () => dispatch('update')
	const dispatchCancle = () => dispatch('cancle')
</script>

<Card>
	<Input 
		bind:value={$user.name} 
		label="name"
		placeholder="eg. john doe"
		required="true" 
	></Input>
	<Input 
		bind:value={$user.email} 
		label="email"
		type="email"
		placeholder="eg. john@doe.com"
		required="true" 
	></Input>

	{#if !$state.isEdit}
		<Input 
			bind:value={$user.password} 
			label="password"
			type="password"
			placeholder="eg. ^&*((%$#j"
			required="true" 
		></Input>
		<Input 
			bind:value={$user.confirmPassword} 
			label="confirm password"
			type="password"
			placeholder="...."
			required="true" 
		></Input>	
	{/if}

	<Select
		bind:value={$user.role}
		options={options}
		label="role"
		required="true" 
	></Select>
	
	{#if $state.isEdit}
		<CancelButton on:click={handleCancle}></CancelButton>
		<UpdateButton on:click={() => handleUpdate($user.id)}></UpdateButton>
	{:else}
		<SaveButton on:click={() => handleCreate('url')}></SaveButton>	
	{/if}
</Card>