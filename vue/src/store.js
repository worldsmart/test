import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

//init store
const store = new Vuex.Store({
    state: {
        user: {},
        customers: [],
        customer: {},
        client: {},
        logs:{}
     },
     mutations: {
        delCustomer (state, id) {        //delete customer from local list
            state.customers = state.customers.filter(customer=>{
                return customer.id == id ? false : true;
            });
        }
      }
})

export default store