import { interpret } from 'xstate'
import baseMachineFactory from './base-crud-machine'

const supplierMachine = baseMachineFactory('supplier', 'suppliers')
const supplierService = interpret(supplierMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default supplierService