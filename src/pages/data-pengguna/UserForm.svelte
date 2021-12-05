<script>
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import Input from '../../components/form/Input.svelte'
	import Select from '../../components/form/Select.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import userService from './userMachine'

	const initialValues = {
		name: '',
		email: '',
		password: '',
		role: ''
	}

	const { form, errors, handleSubmit, handleChange, handleReset, updateInitialValues } = createForm({
		initialValues: {...initialValues},
		validationSchema: yup.object().shape({
			name: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().required(),
			role: yup.string().required()
		}),
		onSubmit: (values) => {
			$userService.matches('idle') && userService.send({ type: 'CREATE', payload: values })
			$userService.matches('edit') && userService.send({ type: 'SAVE_CHANGES', payload: values })
			handleReset()
		}
	})

	userService.onTransition(state => {
		if(state.value == 'edit'){
			updateInitialValues({
				name: state.context.user.name,
				email: state.context.user.email,
				password: state.context.user.password,
				role: state.context.user.role
			})
		} else {
			updateInitialValues({...initialValues})
		}
	})

	const handleCancel = () => {
		handleReset()
		userService.send('CANCEL')
	}

	const roles = ['admin', 'super admin', 'gudang']
</script>


<Card>
	<form on:submit|preventDefault={handleSubmit}>
		
		<Input
			bind:value={$form.name}
			on:change={handleChange}
			error={$errors.name}
			label="nama"
			placeholder="john doe"
			name="name"
		/>

		<Input
			bind:value={$form.email}
			on:change={handleChange} 
			error={$errors.email}
			label="email" 
			placeholder="john@doe.com"
			name="email"
			type="email"
		/>
		{#if !$userService.matches('edit') && !$userService.matches('update')}
			<Input
				bind:value={$form.password}
				on:change={handleChange}
				error={$errors.password}
				label="password"
				placeholder="********"
				name="password"
				type="password"
			/>	
		{/if}
		
		<Select
			bind:value={$form.role}
			on:change={handleChange}
			error={$errors.role}
			label="role"
			name="role"
		>
			{#each roles as role, index (role)}
				<option value="{role}">{role}</option>
			{/each}
		</Select>

		{#if $userService.matches('edit') || $userService.matches('update')}
			<CancelButton
				disabled={$userService.matches('update')}
				on:click={handleCancel}
			/>
			<UpdateButton
				disabled={$userService.matches('update')}
			/>
		{:else}
			<SaveButton
				disabled={!$userService.matches('idle')}
			/>	
		{/if}
	</form>
</Card>