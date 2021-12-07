<script>
	import MainContent from '../../components/main-content/MainContent.svelte'
	import StockIncForm from './StockIncForm.svelte'
	import StockIncTable from './StockIncTable.svelte'
</script>

<MainContent>
	<StockIncForm slot="form" />
	<StockIncTable slot="table" />
</MainContent>