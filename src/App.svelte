<script>
  import Router, { replace } from 'svelte-spa-router'
  import routes from './routes'

  const fallback = (e) => replace('/login')
</script>

<Router {routes} on:conditionsFailed={fallback}  />