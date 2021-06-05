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

  console.log(user)

  return axios.post('/users/register', { user })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      console.log({ registragionError: error.response.data })
      return { error: error.response.data.error, status: false, error_code: error.response.data.error_code }
    });

};


export const deleteAccount = async (user) => {

  console.log(user)

  return axios.post('/users/delete', { user })
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
      console.log({response})
      return { status: true, data: response.data }
    })
    .catch(error => {
      console.log(error?.response?.data)
      return { error: error.response.data.message, status: false }
    });

};


export const buyConsultationsCredits = async (paymentInfo, user, newCredits) => {

  return axios.post('/users/buy_consultations_credits', { paymentInfo, user, newCredits })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};

export const getAllPsychologists = async () => {


  return axios.post('/users/get_all_psychologists', {})
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      let data = error.response.data;
      console.log({ error: data.error, error_code: data.error_code })
      return { error: data.error, error_code: data.error_code, status: false }
    });

};