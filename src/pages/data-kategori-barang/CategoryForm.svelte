<script>
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import Input from '../../components/form/Input.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import categoryService from '../../machines/category-machine'


	const { form, errors, handleSubmit, handleChange, handleReset, updateInitialValues } = createForm({
		initialValues: {
			name: ''
		},
		validationSchema: yup.object().shape({
			name: yup.string().required()
		}),
		onSubmit: (values) => {
			$categoryService.matches('idle') && categoryService.send({ type: 'CREATE', payload: values })
			$categoryService.matches('edit') && categoryService.send({ type: 'SAVE_CHANGES', payload: values })
			handleReset()
		}
	})

	categoryService.onTransition(state => {
		if(state.value == 'edit'){
			updateInitialValues({
				name: state.context.category.name
			})
		} else {
			updateInitialValues({
				name: ''
			})
		}
	})

	const handleCancel = () => {
		handleReset()
		categoryService.send('CANCEL')
	}
</script>


<Card>
	<form on:submit|preventDefault={handleSubmit}>		
		<Input 
			bind:value={$form.name}
			on:change={handleChange} 
			label="kategori barang" 
			placeholder="eg. pupuk kandang"
			name="name"
			error={$errors.name}
		></Input>

		{#if $categoryService.matches('edit') || $categoryService.matches('update')}
			<CancelButton
				disabled={$categoryService.matches('update')}
				on:click={handleCancel}
			/>
			<UpdateButton
				disabled={$categoryService.matches('update')}
			/>
		{:else}
			<SaveButton
				disabled={!$categoryService.matches('idle')}
			/>	
		{/if}
	</form>
</Card>