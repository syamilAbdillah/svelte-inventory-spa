import { wrap } from 'svelte-spa-router/wrap'
import { isAuthenticated } from './stores/auth'

const routes = {
    '/login': wrap({
        asyncComponent: () => import('./pages/login/Login.svelte')
    }),
    '/': wrap({
        asyncComponent: () => import('./pages/Home.svelte'),
        // conditions: [
        //   () => $isAuthenticated
        // ]
    }),
    '/*': wrap({
        asyncComponent: () => import('./pages/Home.svelte'),
        // conditions: [
        //   () => $isAuthenticated
        // ]
    })
}

export default routes