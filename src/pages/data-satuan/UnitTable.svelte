<script>
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import { units, handleDelete, handleEdit } from './unitStore'

	const bodyFields = ['name']
	const headFields = ['satuan']
</script>

<Table>
	<Thead 
		slot="thead"
		fields={headFields}
	></Thead>
	<Tbody
		slot="tbody" 
		fields={bodyFields}
		on:delete={e => handleDelete(e.detail.id)}
		on:edit={e => handleEdit(e.detail)}
		records={$units}
	></Tbody>
</Table>