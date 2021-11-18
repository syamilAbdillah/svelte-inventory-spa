<script>
	import { get } from 'svelte/store'
	import Card from '../card/Card.svelte'
	import Input from '../form/Input.svelte'
	import SaveButton from '../form/SaveButton.svelte'
	import UpdateButton from '../form/UpdateButton.svelte'
	import CancelButton from '../form/CancelButton.svelte'
	import Select from '../form/Select.svelte'

	import { product, handleCreate, handleCancle, handleUpdate, state } from '../../stores/product.js'
	import { units } from '../../stores/unit.js'
	import { suppliers } from '../../stores/supplier.js'
	import { categories } from '../../stores/category.js'

	const getOptions = (store) => get(store).map(s => ({id: s.id, text: s.name}))


	const categoryOptions 	= getOptions(categories)
	const unitOptions 		= getOptions(units)
	const supplierOptions 	= getOptions(suppliers)
</script>


<Card>
	<Input 
		label="nama barang" 
		placeholder="eg. organ dalam"
		required="true"
		bind:value={$product.name}
	/>
	<Select
		label="satuan barang"
		bind:value={$product.unitId}
		options={unitOptions}
	/>
	<Select
		label="kategory barang"
		bind:value={$product.categoryId}
		options={categoryOptions}
	/>
	<Select
		label="supplier"
		bind:value={$product.supplierId}
		options={supplierOptions}
	/>

	{#if $state.isEdit}
	<CancelButton on:click={handleCancle}></CancelButton>
	<UpdateButton on:click={() => handleUpdate($product.id)}></UpdateButton>
	{:else}
	<SaveButton on:click={handleCreate}></SaveButton>
	{/if}
</Card>