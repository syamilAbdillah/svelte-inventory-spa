<script>
	import FormControl from '../../components/form/FormControl.svelte'
	import Input from '../../components/form/Input.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import { unit, state, handleCreate, handleUpdate, handleCancle } from './unitStore'
	
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