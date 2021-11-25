import { createMachine, assign, interpret } from 'xstate'

async function getProducts(){
	try {
		const resp = await fetch('http://localhost:5000/product/')
		if(resp.status != 200) throw new Error(resp.status)

		const products = await resp.json()
		const etag = resp.headers.get('etag')

		return {products, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createProduct(product){
	try {
		const resp = await fetch('http://localhost:5000/product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(product)
		})

		if (resp.status !== 201) throw new Error(resp.status)

		const json = await resp.json()

		return json	
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteProduct(id){
	try {
		const resp = await fetch(`http://localhost:5000/product/${id}`, {
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

async function updateProduct(product){
	try {
		const resp = await fetch(`http://localhost:5000/product/${product.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(product)
		})

		if(resp.status != 200) throw new Error(resp.status)

		return await resp.json()
	} catch(error) {
		console.log(error)
		return error
	}
} 

export const productMachine = createMachine({
	id: 'product-machine',
	initial: 'idle',
	context: {
		etag: undefined,
		products: [],
		product: {}
	},
	states: {
		idle: {
			on: {
				FETCHING: 'load',
				DELETE: 'delete',
				EDIT: {
					target: 'edit',
					actions: 'editProduct'
				},
				CREATE: {
					target: 'create'
				}
			}
		},
		load: {
			entry: 'resetProductForm',
			invoke: {
				id: 'get-products',
				src: (ctx, e) => getProducts,
				onDone: {
					target: 'idle',
					actions: 'successGetProducts'
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
					actions: 'resetProductForm'
				}
			}
		},
		update: {
			invoke: {
				id: 'update-product',
				src: (ctx, e) => updateProduct({...ctx.product, ...e.payload}),
				onDone: {
					target:'load',
					actions: 'resetProductForm'
				},
				onError: 'edit'
			}
		},
		delete: {
			invoke: {
				id: 'delete-product',
				src: (_, e) => deleteProduct(e.payload.id),
				onDone: 'load',
				onError: 'idle'
			}
		},
		create: {
			invoke: {
				id: 'create-new-product',
				src: (ctx, e) => createProduct(e.payload),
				onDone: 'load',
				onError: 'create'
			}
		}
	}
}, 
{
	actions: {
		editProduct: assign({
			product: (ctx, e) => ({...e.payload})
		}),
		resetProductForm: assign({
			product: (ctx, _) => ({})
		}),
		successGetProducts: assign({
			products: (ctx, e) => {
				return e.data.products.data
			},
			etag: (ctx, e) => e.data.etag
		})
	},
	guards: {}
})

const produtService = interpret(productMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default produtService