const axios = require('axios').default;

const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/'
export default {
    state: {
        token: ''
    },
    mutations: {
        SET_TOKEN: (state, data) => {
            state.token = data;
        }
    },
    actions: {
        SEND_FORM: async ({getters,dispatch,commit}, data) => {


            const token = getters.GET_TOKEN
            let formData = new FormData();

            fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
                {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Token': token,
                    },
                })
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                console.log(data);
                if (data.success) {
                } else {
                }
            }).catch(function (error) {

                console.log(error);
            });
            commit('RESET_ITEM_PAGE');
            dispatch('GET_USERS_DATA');
            // axios(`${url}users`, {
            //     method: 'POST',
            //     body: data,
            //     headers: {
            //         'Token': token,
            //     },
            // }).catch(function (error) {
            //     if (error.response) {
            //         console.log(error.response)
            //     } else if (error.request) {
            //         console.log(error.request);
            //     } else {
            //         console.log('Error', error.message);
            //     }
            //     console.log(error.config);
            // });


        },
        GET_POSITIONS_DATA: async () => {
            try {
                const response = await axios(`${url}positions`);
                return response.data.positions
            } catch (e) {
                console.log(e);
            }

        },
        GET_NEW_TOKEN: async ({commit}) => {
            try {
                const response = await axios(`https://frontend-test-assignment-api.abz.agency/api/v1/token`);
                commit('SET_TOKEN', response.data.token)

            } catch (e) {
                console.log(e);
            }
        }
    },
    getters: {
        GET_TOKEN: (state) => {
            return state.token
        }
    },
}
