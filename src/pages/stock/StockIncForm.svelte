<script>
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import Input from '../../components/form/Input.svelte'
	import Select from '../../components/form/Select.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import productService from '../data-barang/productMachine'
	import stockIncService from './stockIncMachine'

	const initialValues = {
		productId: '',
		date: '',
		qty: 0,
		desc: '',

	}


	const { form, errors, handleSubmit, handleChange, handleReset, updateInitialValues } = createForm({
		initialValues: {...initialValues},
		validationSchema: yup.object().shape({
			productId: yup.string().required('anda harus memilih barang'),
			date: yup.string().required('anda harus memilih tanggal'),
			qty: yup.number().moreThan(1, 'kuantitas harus lebih dari 0').required(),
			desc: yup.string().required('anda harus menuliskan deskripsi')
		}),
		onSubmit: (values) => {
			$stockIncService.matches('idle') && stockIncService.send({ type: 'CREATE', payload: values })
			$stockIncService.matches('edit') && stockIncService.send({ type: 'SAVE_CHANGES', payload: values })
			handleReset()
		}
	})

	stockIncService.onTransition(state => {
		if(state.value == 'edit'){
			updateInitialValues({
				productId: state.context.stockInc.product.id,
				date: state.context.stockInc.date,
				qty: state.context.stockInc.qty,
				desc: state.context.stockInc.desc
			})
		} else {
			updateInitialValues({...initialValues})
		}

		if(state.value == 'loadOptions'){
			productService.send('FETCHING')
		}
	})

	const handleCancel = () => {
		handleReset()
		stockIncService.send('CANCEL')
	}
</script>


<Card>
	<form on:submit|preventDefault={handleSubmit}>
		<Input 
			bind:value={$form.date}
			on:change={handleChange}
			error={$errors.date}
			label="Tanggal"
			name="date"
			type="date"
		/>
		<Select
			bind:value={$form.productId}
			on:change={handleChange}
			error={$errors.productId}
			label="Barang"
			name="productId"
		>
			{#each $productService.context.products as product, index (product.id)}
				<option value="{product.id}">{ product.name }</option>
			{/each}
		</Select>
		<Input 
			bind:value={$form.qty}
			on:change={handleChange}
			error={$errors.qty}
			label="Kuantitas"
			type="number"
			name="qty"
		/>
		<Input 
			bind:value={$form.desc}
			on:change={handleChange}
			error={$errors.desc}
			label="Keterangan"
			name="desc"
		/>
		{#if $stockIncService.matches('edit') || $stockIncService.matches('update')}
			<CancelButton
				disabled={$stockIncService.matches('update')}
				on:click={handleCancel}
			/>
			<UpdateButton
				disabled={$stockIncService.matches('update')}
			/>
		{:else}
			<SaveButton
				disabled={!$stockIncService.matches('idle')}
			/>	
		{/if}
	</form>
</Card>