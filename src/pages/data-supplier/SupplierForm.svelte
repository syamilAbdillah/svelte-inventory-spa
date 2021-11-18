<script>
	import Card from '../card/Card.svelte'
	import Input from '../form/Input.svelte'
	import SaveButton from '../form/SaveButton.svelte'
	import UpdateButton from '../form/UpdateButton.svelte'
	import CancelButton from '../form/CancelButton.svelte'

	import { supplier, handleCreate, handleCancle, handleUpdate, state } from '../../stores/supplier.js'

</script>


<Card>
	<Input
		bind:value={$supplier.name}
		label="nama supplier"
		placeholder="eg. PT. Makmur Sleketep"
		required="true"
	/>

	<Input
		bind:value={$supplier.email}
		type="email"
		label="email"
		placeholder="makmur@sleketep.com"
		required="true"
	/>

	<Input
		bind:value={$supplier.phone}
		label="no.telp"
		placeholder="eg. 089977778888"
		required="true"
	/>

	<Input
		bind:value={$supplier.address}
		label="alamat"
		placeholder="eg. PT. Makmur Sleketep"
		required="true"
	/>

	{#if $state.isEdit}
	<CancelButton on:click={handleCancle}></CancelButton>
	<UpdateButton on:click={() => handleUpdate($supplier.id)}></UpdateButton>
	{:else}
	<SaveButton on:click={handleCreate}/>
	{/if}

</Card>