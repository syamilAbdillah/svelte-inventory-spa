<script>
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import Input from '../../components/form/Input.svelte'
	import Select from '../../components/form/Select.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import supplierService from '../../machines/supplier-machine'
	import unitService from '../../machines/unit-machine'
	import categoryService from '../../machines/category-machine'
	import productService from '../../machines/product-machine'

	const initialValues = {
		name: '',
		categoryId: '',
		supplierId: '',
		unitId: ''
	}


	const { form, errors, handleSubmit, handleChange, handleReset, updateInitialValues } = createForm({
		initialValues: {...initialValues},
		validationSchema: yup.object().shape({
			name: yup.string().required(),
			categoryId: yup.string().required(),
			supplierId: yup.string().required(),
			unitId: yup.string().required()
		}),
		onSubmit: (values) => {
			$productService.matches('idle') && productService.send({ type: 'CREATE', payload: values })
			$productService.matches('edit') && productService.send({ type: 'SAVE_CHANGES', payload: values })
			handleReset()
		}
	})

	productService.onTransition(state => {
		if(state.value == 'edit'){
			updateInitialValues({
				name: state.context.product.name,
				categoryId: state.context.product.categoryId,
				supplierId: state.context.product.supplierId,
				unitId: state.context.product.unitId
			})
		} else {
			updateInitialValues({...initialValues})
		}

		if(state.value == 'loadOptions'){
			categoryService.send('FETCHING')
			supplierService.send('FETCHING')
			unitService.send('FETCHING')
		}
	})

	const handleCancel = () => {
		handleReset()
		productService.send('CANCEL')
	}
</script>


<Card>
	<form on:submit|preventDefault={handleSubmit}>
		<Input 
			bind:value={$form.name}
			on:change={handleChange}
			error={$errors.name}
			label="nama barang" 
			placeholder="eg. organ dalam"
			name="name"
		/>
		<Select
			bind:value={$form.unitId}
			on:change={handleChange}
			error={$errors.unitId}
			label="satuan barang"
			name="unitId"
		>
			<option value="" disabled selected>~Pilih Satuan~</option>
			{#each $unitService.context.units as unit, index (unit.id)}
				<option value="{unit.id}">{ unit.name }</option>
			{/each}
		</Select>
		<Select
			bind:value={$form.categoryId}
			on:change={handleChange}
			error={$errors.categoryId}
			label="kategori barang"
			name="categoryId"
		>
			<option value="" disabled selected>~Pilih Kategori Barang~</option>
			{#each $categoryService.context.categories as cateogry, index (cateogry.id)}
				<option value="{cateogry.id}">{ cateogry.name }</option>
			{/each}
		</Select>
		<Select
			bind:value={$form.supplierId}
			on:change={handleChange}
			error={$errors.supplierId}
			label="supplier"
			name="supplierId"
		>
			<option value="" disabled selected>~Pilih Supplier~</option>
			{#each $supplierService.context.suppliers as supplier, index (supplier.id)}
				<option value="{supplier.id}">{ supplier.code } - { supplier.name }</option>
			{/each}
		</Select>
		{#if $productService.matches('edit') || $productService.matches('update')}
			<CancelButton
				disabled={$productService.matches('update')}
				on:click={handleCancel}
			/>
			<UpdateButton
				disabled={$productService.matches('update')}
			/>
		{:else}
			<SaveButton
				disabled={!$productService.matches('idle')}
			/>	
		{/if}
	</form>
</Card>