import { interpret } from 'xstate'
import baseMachineFactory from './base-crud-machine'

const productMachine = baseMachineFactory('product', 'products', { withOption: true })
const productService = interpret(productMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default productService