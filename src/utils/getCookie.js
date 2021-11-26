export default function(cookieName) {
	if(document.cookie.length < 3) return null

	const cookies = document.cookie.split('; ')
	const cookie = cookies.find(function(c){
		const [key, value] = c.split('=')
		return key == cookieName
	})

	if(!cookie) return null

	const [_, result] = cookie.split('=')
	return result
}