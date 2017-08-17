export default {
	namespace: 'credit_card',
	state: {
        is_load: false,
        credit_card_list: []
	},

	reducers: {
		fetch(state, action) {
			return {...state, ...action.data};
		}
	}

};