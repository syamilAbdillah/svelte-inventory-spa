import { wrap } from 'svelte-spa-router/wrap'
import getCookie from './utils/getCookie'
import LoadingFallback from './pages/LoadingFallback.svelte'

const simpleAuthGuard = () => {
   const refreshToken = getCookie('refresh-token')
   return typeof(refreshToken) == 'string' && refreshToken.length > 1
}

const routes = {
    '/login': wrap({
        asyncComponent: () => import('./pages/login/Login.svelte'),
        loadingComponent: LoadingFallback
    }),
    '/': wrap({
        asyncComponent: () => import('./pages/Home.svelte'),
        conditions: [simpleAuthGuard]
    }),
    '/*': wrap({
        asyncComponent: () => import('./pages/Home.svelte'),
        conditions: [simpleAuthGuard]
    })
}

export default routes