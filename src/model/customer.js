export default {

    namespace: 'customer',

    state: {
        customer_name: '',
        customer_phone: '',
        customer_birthday: '',
        customer_city: '',
        customer_sex: '',
        customer_id_card: '',
        customer_money: '',
        customer_fang: '',
        customer_che: '',
        customer_xin: '',
        customer_shou: '',
        customer_dai: '',
        customer_gong: ''
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        }
    }

};