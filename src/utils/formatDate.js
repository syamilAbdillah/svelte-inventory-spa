export default function(dateString) {
	const date = new Date(dateString)
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}