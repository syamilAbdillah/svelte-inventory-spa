import { createMachine, assign, interpret } from 'xstate'


async function getCategories() {
	try {
		const resp = await fetch('http://localhost:5000/category')
		if(resp.status != 200) throw new Error(resp.status)

		const categories = await resp.json()
		const etag = resp.headers.get('etag')

		return {categories, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createCategory(category){
	try {
		const resp = await fetch('http://localhost:5000/category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(category)
		})

		if (resp.status !== 201) throw new Error(resp.status)

		const json = await resp.json()

		return json	
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteCategry(id){
	try {
		const resp = await fetch(`http://localhost:5000/category/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (resp.status != 200) throw new Error(resp.status)	

		return await resp.json()
	} catch(error) {
		console.log(error)
		return error
	}
}

async function updateCategry(category){
	try {
		const resp = await fetch(`http://localhost:5000/category/${category.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(category)
		})

		if(resp.status != 200) throw new Error(resp.status)

		return await resp.json()
	} catch(error) {
		console.log(error)
		return error
	}
} 

export const categoryMachine = createMachine({
	id: 'category-machine',
	initial: 'idle',
	context: {
		etag: undefined,
		categories: [],
		category: {}
	},
	states: {
		idle: {
			on: {
				FETCHING: 'load',
				DELETE: 'delete',
				EDIT: {
					target: 'edit',
					actions: 'editCategory'
				},
				CREATE: {
					target: 'create'
				}
			}
		},
		load: {
			entry: 'resetCategoryForm',
			invoke: {
				id: 'get-categories',
				src: (ctx, e) => getCategories,
				onDone: {
					target: 'idle',
					actions: 'successGetCategories'
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
					actions: 'resetCategoryForm'
				}
			}
		},
		update: {
			invoke: {
				id: 'update-category',
				src: (ctx, e) => updateCategry({...ctx.category, ...e.payload}),
				onDone: {
					target:'load',
					actions: 'resetCategoryForm'
				},
				onError: 'edit'
			}
		},
		delete: {
			invoke: {
				id: 'delete-category',
				src: (_, e) => deleteCategry(e.payload.id),
				onDone: 'load',
				onError: 'idle'
			}
		},
		create: {
			invoke: {
				id: 'create-new-category',
				src: (ctx, e) => createCategory(e.payload),
				onDone: 'load',
				onError: 'create'
			}
		}
	}
}, 
{
	actions: {
		editCategory: assign({
			category: (ctx, e) => ({...e.payload})
		}),
		resetCategoryForm: assign({
			category: (ctx, _) => ({})
		}),
		successGetCategories: assign({
			categories: (ctx, e) => {
				return e.data.categories.data
			},
			etag: (ctx, e) => e.data.etag
		})
	}
})

const categoryService = interpret(categoryMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default categoryService