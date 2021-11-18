<script>
	import Card from '../card/Card.svelte'
	import Input from '../form/Input.svelte'
	import Select from '../form/Select.svelte'
	import SaveButton from '../form/SaveButton.svelte'
	import UpdateButton from '../form/UpdateButton.svelte'
	import CancelButton from '../form/CancelButton.svelte'

	const productOptions = [
		{
			id: Date.now(),
			text: 'Product 1'
		}
	]
</script>

<Card>
	<Input
		label="quantity"
		type="number"
		placeholder="..."
		required="true"
	></Input>
	<Input
		label="tanggal"
		type="date"
		placeholder="..."
		required="true"
	></Input>
	<Input
		label="deskripsi"
		placeholder="..."
		required="true"
	></Input>
	<Select
		options={productOptions}
		label="opsi barang"
		required="true"
		placeholder="..."
	></Select>
</Card>