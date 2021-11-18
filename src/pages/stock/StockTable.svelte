<script>
	import Table from '../table/Table.svelte'
	import Thead from '../table/Thead.svelte'
	import Tbody from '../table/Tbody.svelte'
	import SkeletonRow from '../table/SkeletonRow.svelte'
	import EditButton from '../table/EditButton.svelte'
	import DeleteButton from '../table/DeleteButton.svelte'

	const fields = ['kode', 'tgl', 'kuantitas', 'deskripsi', 'nama barang']

	const records = [
		{
			id: Date.now(),
			code: `BRM-${Date.now()}`,
			date: new Date(Date.now()),
			qty: 90, 
			desc: 'test',
			product: {
				id: Date.now(),
				name: 'test'
			}
		}
	]
</script>	

<Table>
	<Thead slot="thead" fields={fields}></Thead>
	<tbody slot="tbody">
		{#each records as record, index (record.id)}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ record.code }</td>
				<td>{ JSON.stringify(record.date) }</td>
				<td>{ record.qty }</td>
				<td>{ record.desc }</td>
				<td>{ record.product.name }</td>
				<td>
					<EditButton></EditButton>
					<DeleteButton></DeleteButton>
				</td>
			</tr>
		{/each}
	</tbody>
</Table>