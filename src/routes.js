import { wrap } from 'svelte-spa-router/wrap'
import getCookie from './utils/getCookie'

const simpleAuthGuard = () => {
   const accessToken = getCookie('access-token')
   return typeof(accessToken) == 'string' && accessToken.length > 1
}

const routes = {
    '/login': wrap({
        asyncComponent: () => import('./pages/login/Login.svelte')
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