import axios from '../services/axios.service';

export const login = async (user) => {

  return axios.post('/users/login', { user })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};

export const logout = async (user) => {

  return axios.post('/users/logout', { user })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};


export const register = async (user) => {

  return axios.post('/users/register', { user })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};


export const buyClassesCredits = async (paymentInfo, user, newCredits) => {

  return axios.post('/users/buy_classes_credits', { paymentInfo, user, newCredits })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};
