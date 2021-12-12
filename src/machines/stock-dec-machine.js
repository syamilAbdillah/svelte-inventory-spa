import { interpret } from 'xstate'
import baseMachineFactory from './base-crud-machine'

const stockDecMachine = baseMachineFactory('stockDec', 'stockDecs', { withOption: true, url: 'stock/dec' })
const stockDecService = interpret(stockDecMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default stockDecService