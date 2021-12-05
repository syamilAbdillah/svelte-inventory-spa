<script>
	let isLoading = false
	function handleClick(e){ 
		isLoading = true
		return fetch('https://jsonplaceholder.typicode.com/todos/1')
			.then(() => {
				const link = document.createElement('a')
				link.href = 'https://sample-videos.com/csv/Sample-Spreadsheet-10-rows.csv'
				link.download = 'data-barang.csv'
				link.click()
			})
			.catch(error => alert(error.message))
			.finally(() => isLoading = false)
	}
</script>
<h3 class="text-4xl">dashboard</h3>
<button 
	class="btn btn-primary {isLoading ? 'loading': ''}" 
	disabled={isLoading} 
	on:click={handleClick}
	>
	Download file csv !!!
</button>

<!-- 
TODO :
	- bikin visibility route bergantung ke role ////////
	- bikin DTO validator di server 
	- bikin dashboard
 -->