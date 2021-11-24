<script>
	import {useMachine} from '@xstate/svelte'
	import FormControl from '../../components/form/FormControl.svelte'
	import Input from '../../components/form/Input.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
	import unitService, { unit } from './unitMachine'
	
</script>

<Card>
	<Input 
		bind:value={$unit.name} 
		label="satuan" 
		placeholder="eg. pcs"
	></Input>

	{#if $unitService.matches('edit') || $unitService.matches('update')}
	<CancelButton 
		on:click={
			() => unitService.send('CANCEL')
		}

		disabled={$unitService.matches('update')}
	/>
	<UpdateButton 
		on:click={
			() => unitService.send({
				type: 'SAVE_CHANGES',
				payload: $unit
			})
		}

		disabled={$unitService.matches('update')}
	/>
	{:else}
	<SaveButton 
		on:click={
			() => unitService.send('CREATE')
		}

		disabled={$unitService.matches('create')}
	/>	
	{/if}
</Card>