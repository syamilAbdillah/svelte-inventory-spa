<script>
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import Input from '../../components/form/Input.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import supplierService from '../../machines/supplier-machine'

	const initialValues = {
		name: '',
		email: '',
		phone: '',
		address: ''
	}

	const { form, errors, handleSubmit, handleChange, handleReset, updateInitialValues } = createForm({
		initialValues: {...initialValues},
		validationSchema: yup.object().shape({
			name: yup.string().required(),
			email: yup.string().email().required(),
			phone: yup.string().required(),
			address: yup.string().required()
		}),
		onSubmit: (values) => {
			$supplierService.matches('idle') && supplierService.send({ type: 'CREATE', payload: values })
			$supplierService.matches('edit') && supplierService.send({ type: 'SAVE_CHANGES', payload: values })
			handleReset()
		}
	})

	supplierService.onTransition(state => {
		if(state.value == 'edit'){
			updateInitialValues({
				name: state.context.supplier.name,
				email: state.context.supplier.email,
				phone: state.context.supplier.phone,
				address: state.context.supplier.address
			})
		} else {
			updateInitialValues({...initialValues})
		}
	})

	const handleCancel = () => {
		handleReset()
		supplierService.send('CANCEL')
	}
</script>


<Card>
	<form on:submit|preventDefault={handleSubmit}>
		
		<Input
			bind:value={$form.name}
			on:change={handleChange}
			error={$errors.name}
			label="nama supplier"
			placeholder="eg. PT. Makmur Sleketep"
			name="name"
		/>

		<Input
			bind:value={$form.email}
			on:change={handleChange} 
			error={$errors.email}
			label="email" 
			placeholder="makmur@sleketep.com"
			name="email"
			type="email"
		/>

		<Input
			bind:value={$form.phone}
			on:change={handleChange}
			error={$errors.phone}
			label="no.telp"
			placeholder="eg. 089977778888"
			name="phone"
			type="number"
		/>

		<Input
			bind:value={$form.address}
			on:change={handleChange}
			error={$errors.address}
			label="alamat"
			placeholder="eg. Bekasi, 17151"
			name="address"
		/>

		{#if $supplierService.matches('edit') || $supplierService.matches('update')}
			<CancelButton
				disabled={$supplierService.matches('update')}
				on:click={handleCancel}
			/>
			<UpdateButton
				disabled={$supplierService.matches('update')}
			/>
		{:else}
			<SaveButton
				disabled={!$supplierService.matches('idle')}
			/>	
		{/if}
	</form>
</Card>