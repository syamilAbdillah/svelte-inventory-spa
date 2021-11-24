import { createMachine, assign, interpret } from 'xstate';
import {writable, get} from 'svelte/store' 

export const unit = writable({})

const mockFetching = () => 
	new Promise((resolve, reject) => 
		setTimeout(() => resolve({ data: 'yay' }), 1000)
	)


async function getUnits() {
	try {
		const resp = await fetch('http://localhost:5000/unit/')
		if(resp.status != 200) throw new Error(resp.status)

		const units = await resp.json()
		const etag = resp.headers.get('etag')

		return {units, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
} 

export const unitMachine = createMachine({
	id: 'unit-machine',
	initial: 'idle',
	context: {
		etag: undefined,
		units: [],
		selectedUnit: {}
	},
	states: {
		idle: {
			on: {
				FETCHING: 'load',
				DELETE: 'delete',
				EDIT: {
					target: 'edit',
					actions: 'editUnit'
				},
				CREATE: {
					target: 'create',
				}
			}
		},
		load: {
			invoke: {
				id: 'get-units',
				src: (ctx, e) => getUnits,
				onDone: {
					target: 'idle',
					actions: assign({
						units: (ctx, e) => {
							return e.data.units.data
						},
						etag: (ctx, e) => e.data.etag
					})
				},
				onError: {
					target: 'load'
				}
			}
		},
		edit: {
			on: {
				SAVE_CHANGES: {
					target: 'update'
				},
				CANCEL: {
					target: 'idle',
					actions: 'resetUnitForm'
				}
			}
		},
		update: {
			invoke: {
				id: 'update-unit',
				src: () => mockFetching,
				onDone: {
					target:'load',
					actions: 'resetUnitForm'
				},
				onError: 'edit'
			}
		},
		delete: {
			invoke: {
				id: 'delete-unit',
				src: () => mockFetching,
				onDone: 'load',
				onError: 'idle'
			}
		},
		create: {
			invoke: {
				id: 'create-new-unit',
				src: () => mockFetching,
				onDone: 'load',
				onError: 'create'
			}
		}
	}
}, 
{
	actions: {
		editUnit: assign({
			selectedUnit: (ctx, e) => ({...e.payload})
		}),
		resetUnitForm: assign({
			selectedUnit: (ctx, _) => ({})
		})
	},
	guards: {}
})

const unitService = interpret(unitMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default unitService