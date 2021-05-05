import axios from '../services/axios.service';

export const getAll = async () => {

  return axios.get('/lessons/get_all')
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};

export const getAllByUserId = async (user_id) => {

  return axios.post('/lessons/get_all_by_id_user_client', { user_id })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};

export const schedule = async (params) => {


  return axios.post('/lessons/schedule', params)
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};

export const getDefaultAvailableTimes = async () => {

  return axios.post('/default_times/get_all')
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};