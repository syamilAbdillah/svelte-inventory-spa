import { writable, get } from 'svelte/store'

const initialUnit = { name: '' }

export const units = writable([{ name: 'pack', id: Date.now() }])
export const unit = writable({...initialUnit})
export const state = writable({
	isEdit: false,
	isLoading: false
})

export const handleCreate = () => {
	unit.update(prevUnit => {

		prevUnit.id = Date.now()
		units.update(prevUnits => { 
			prevUnits.push(prevUnit)
			return prevUnits
		})

		return {...initialUnit}
	})
}



export const handleEdit = (unitObject) => {
	unit.update(prevUnit => ({
		...prevUnit, 
		name: unitObject.name, 
		id: unitObject.id 
	}))
	state.update(prevState => ({...prevState, isEdit: true}))
}



export const handleUpdate = id => {
	units.update(prevUnits => {
		prevUnits.find((elm, index, array) => {
			if(elm.id == id) {
				array[index] = get(unit)
			}

			return elm.id == id
		})

		return prevUnits
	})

	handleCancle()
}



export const handleDelete = id => {
	units.update(prevUnits => prevUnits.filter(elm => elm.id != id))
}



export const handleCancle = () => {
	unit.set({...initialUnit})
	state.update(prevState => ({...prevState, isEdit: false}))
}