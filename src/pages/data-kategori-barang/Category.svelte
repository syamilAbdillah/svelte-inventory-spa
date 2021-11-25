<script>
	import CategoryForm from './CategoryForm.svelte'
	import CategoryTable from './CategoryTable.svelte'
	import MainContent from '../../components/main-content/MainContent.svelte'
</script>

<MainContent>
	<CategoryForm slot="form"></CategoryForm>
	<CategoryTable slot="table"></CategoryTable>
</MainContent>