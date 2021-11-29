import { createMachine, assign, interpret } from 'xstate'
import request from '../../utils/request'

async function getProducts(){
	try {
		const resp = await request.get('/product/')
		const products = resp.data
		const etag = resp.headers.etag

		return {products, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createProduct(product){
	try {
		const resp = await request.post('/product', product)
		return resp.data	
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteProduct(id){
	try {
		const resp = await request.delete(`/product/${id}`)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function updateProduct(product){
	try {
		const resp = await request.put(`/product/${product.id}`, product)
		return resp.data
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
					target: 'loadOptions',
					actions: 'successGetProducts'
				},
				onError: {
					target: 'load'
				}
			}
		},
		loadOptions: {
			after: {
				1000: 'idle'
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
	guards: {
		isProductsLoaded: (ctx, e) => ctx.etag != undefined,
		isProductsUnloaded: (ctx, _) => ctx.etag == undefined
	}
})

const produtService = interpret(productMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default produtService