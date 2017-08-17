export default {
	namespace: 'article',
	state: {
        is_load: false,
        list: []
	},

	reducers: {
		fetch(state, action) {
			return {...state, ...action.data};
		}
	}

};