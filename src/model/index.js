export default {

    namespace: 'index',

    state: {
        is_load: false,
        product_category_list: [],
        product_list: []
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        }
    }

};