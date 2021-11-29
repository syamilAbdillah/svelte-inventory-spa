import axios from 'axios'
import { getAuthData, setAuthData } from '../pages/login/auth-store'
import getCookie from './getCookie'
import setCookie from './setCookie'
import jwt_decode from 'jwt-decode'

const request = axios.create({
	baseURL: import.meta.env.VITE_BASEURL,
	validateStatus: function(status){
		return status >= 200 && status <= 304
	}
})

request.interceptors.request.use(
	async (config) => {
		const authCredential = getAuthData()
		const isTokenExpire = authCredential.exp && ((authCredential.exp * 1000) < Date.now())
		
		if(!authCredential.accessToken || isTokenExpire) {
			try {
				const resp = await axios.get(`${import.meta.env.VITE_BASEURL}/user/refresh-token`, {
					headers: {
						'Authorization': getCookie('refresh-token')
					}
				})

				const refreshToken = resp.data.data.refreshToken
				const accessToken = resp.data.data.accessToken

				setAuthData(accessToken)
				setCookie('refresh-token', refreshToken)

				config.headers.common['Authorization'] = `Bearer ${accessToken}`
				return config
			} catch(error) {
				console.log(error)

				return config
			}
		} 
			
		config.headers['Authorization'] = `Bearer ${authCredential.accessToken}`

		return config
	}, 
	error => Promise.reject(error)
)

export default request
