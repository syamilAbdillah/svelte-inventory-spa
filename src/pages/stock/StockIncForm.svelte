<script>
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import Input from '../../components/form/Input.svelte'
	import Select from '../../components/form/Select.svelte'
	import SaveButton from '../../components/form/SaveButton.svelte'
	import UpdateButton from '../../components/form/UpdateButton.svelte'
	import CancelButton from '../../components/form/CancelButton.svelte'
	import Card from '../../components/card/Card.svelte'
</script>

<Card>
	<form>
		<Input
			label="quantity"
			type="number"
			placeholder="0"
			required="true"
		/>
		<Input
			label="tanggal"
			type="date"
			placeholder="..."
			required="true"
		/>
		<Input
			label="deskripsi"
			placeholder="..."
			required="true"
		/>
		<Select
			label="opsi barang"
			required="true"
			placeholder="..."
		>
			{#each ["test", "test"] as item, index}
				<option value={item}>{ item }</option>
			{/each}
		</Select>
	</form>
</Card>