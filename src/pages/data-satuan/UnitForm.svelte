<script>
	import FormControl from '../form/FormControl.svelte'
	import Input from '../form/Input.svelte'
	import SaveButton from '../form/SaveButton.svelte'
	import UpdateButton from '../form/UpdateButton.svelte'
	import CancelButton from '../form/CancelButton.svelte'
	import Card from '../card/Card.svelte'
	import { unit, state, handleCreate, handleUpdate, handleCancle } from '../../stores/unit.js'
	
</script>

<Card>
	<Input 
		bind:value={$unit.name} 
		label="satuan" 
		placeholder="eg. pcs"
	></Input>

	{#if $state.isEdit}
	<CancelButton on:click={handleCancle}></CancelButton>
	<UpdateButton on:click={() => handleUpdate($unit.id)}></UpdateButton>
	{:else}
	<SaveButton on:click={handleCreate}></SaveButton>	
	{/if}
</Card>