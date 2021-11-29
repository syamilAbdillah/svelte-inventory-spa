<script>
	import {useMachine} from '@xstate/svelte'
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import FormControl from '../../components/form/FormControl.svelte'
	import Input from '../../components/form/Input.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import unitService from './unitMachine'


	const { form, errors, handleSubmit, handleChange, handleReset, isValid, touched, updateInitialValues } = createForm({
		initialValues: {
			name: ''
		},
		validationSchema: yup.object().shape({
			name: yup.string().required()
		}),
		onSubmit: (values) => {
			$unitService.matches('idle') && unitService.send({ type: 'CREATE', payload: values })
			$unitService.matches('edit') && unitService.send({ type: 'SAVE_CHANGES', payload: values })
			handleReset()
		}
	})

	unitService.onTransition(state => {
		if(state.value == 'edit'){
			updateInitialValues({
				name: state.context.unit.name
			})
		} else {
			updateInitialValues({
				name: ''
			})
		}
	})

	const handleCancel = () => {
		handleReset()
		unitService.send('CANCEL')
	}
</script>

<Card>
	<form on:submit|preventDefault={handleSubmit}>		
		<Input 
			bind:value={$form.name}
			on:change={handleChange} 
			label="satuan" 
			placeholder="eg. pcs"
			name="name"
			error={$errors.name}
		></Input>

		{#if $unitService.matches('edit') || $unitService.matches('update')}
			<CancelButton
				disabled={$unitService.matches('update')}
				on:click={handleCancel}
			/>
			<UpdateButton
				disabled={$unitService.matches('update')}
			/>
		{:else}
			<SaveButton
				disabled={!$unitService.matches('idle')}
			/>	
		{/if}
	</form>
</Card>