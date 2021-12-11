import { interpret } from 'xstate'
import baseMachineFactory from './base-crud-machine'

const stockIncMachine = baseMachineFactory('stockInc', 'stockIncs', { withOption: true, url: 'stock/inc' })
const stockIncService = interpret(stockIncMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default stockIncService