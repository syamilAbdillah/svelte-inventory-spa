<script>
	import Card from '../card/Card.svelte'
	import Input from '../form/Input.svelte'
	import SaveButton from '../form/SaveButton.svelte'
	import UpdateButton from '../form/UpdateButton.svelte'
	import CancelButton from '../form/CancelButton.svelte'
	import { category, handleCreate, handleCancle, handleUpdate, state } from '../../stores/category.js'
</script>


<Card>
	<Input 
		bind:value={$category.name} 
		label="satuan"
		placeholder="eg. skincare"
		required="true"
	></Input>

	{#if $state.isEdit}
	<CancelButton on:click={handleCancle}></CancelButton>
	<UpdateButton on:click={() => handleUpdate($category.id)}></UpdateButton>
	{:else}
	<SaveButton on:click={handleCreate}></SaveButton>
	{/if}
</Card>