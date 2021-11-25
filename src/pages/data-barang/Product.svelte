<script>
	import MainContent from '../../components/main-content/MainContent.svelte'
	import ProductForm from './ProductForm.svelte'
	import ProductTable from './ProductTable.svelte'
</script>

<MainContent>
	<ProductForm slot="form"></ProductForm>
	<ProductTable slot="table"></ProductTable>
</MainContent>