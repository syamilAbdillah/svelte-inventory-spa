<script>
	import Table from '../table/Table.svelte'
	import Thead from '../table/Thead.svelte'
	import Tbody from '../table/Tbody.svelte'

	import { categories, handleEdit, handleDelete } from '../../stores/category.js'

	const headFields = ['kategory']
	const bodyFields = ['name']

</script>


<Table>
	<Thead slot="thead" fields={headFields}></Thead>
	<Tbody 
		slot="tbody" 
		fields={bodyFields} 
		records={$categories}
		on:delete={e => handleDelete(e.detail.id)}
		on:edit={e => handleEdit(e.detail)}
	></Tbody>
</Table>