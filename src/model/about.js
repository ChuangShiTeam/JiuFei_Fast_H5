export default {
	namespace: 'about',
	state: {
        is_load: false,
        about: {}
	},

	reducers: {
		fetch(state, action) {
			return {...state, ...action.data};
		}
	}

};