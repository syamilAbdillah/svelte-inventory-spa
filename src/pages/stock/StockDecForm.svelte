<script>
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import Input from '../../components/form/Input.svelte'
	import Select from '../../components/form/Select.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import productService from '../../machines/product-machine'
	import stockDecService from '../../machines/stock-dec-machine'
	import formatDate from '../../utils/formatDate'

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
			qty: yup.number().moreThan(0, 'kuantitas harus lebih dari 0').required(),
			desc: yup.string().required('anda harus menuliskan deskripsi')
		}),
		onSubmit: (values) => {
			$stockDecService.matches('idle') && stockDecService.send({ type: 'CREATE', payload: values })
			$stockDecService.matches('edit') && stockDecService.send({ type: 'SAVE_CHANGES', payload: values })
			handleReset()
		}
	})

	stockDecService.onTransition(state => {
		if(state.value == 'edit'){
			updateInitialValues({
				productId: state.context.stockDec.product.id,
				date: formatDate(state.context.stockDec.date),
				qty: state.context.stockDec.qty,
				desc: state.context.stockDec.desc
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
		stockDecService.send('CANCEL')
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
		{#if $stockDecService.matches('edit') || $stockDecService.matches('update')}
			<CancelButton
				disabled={$stockDecService.matches('update')}
				on:click={handleCancel}
			/>
			<UpdateButton
				disabled={$stockDecService.matches('update')}
			/>
		{:else}
			<SaveButton
				disabled={!$stockDecService.matches('idle')}
			/>	
		{/if}
	</form>
</Card>