export default {

	namespace: 'credit_card',

	state: {
		
	},

	reducers: {
		fetch(state, action) {
			return {...state, ...action.data};
		}
	}

};