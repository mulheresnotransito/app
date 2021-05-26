import axios from '../services/axios.service';

export const getAll = async () => {

  return axios.get('/consultations/get_all')
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      let data = error.response.data;
      console.log({error: data.error, error_code: data.error_code})
      return { error: data.error, error_code: data.error_code, status: false }
    });

};

export const getAllByUserId = async (user_id) => {

  return axios.post('/consultations/get_all_by_id_user_client', { user_id })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      let data = error.response.data;
      console.log({error: data.error, error_code: data.error_code})
      return { error: data.error, error_code: data.error_code, status: false }
    });

};

export const getAllScheduledByUserId = async (user_id) => {

  return axios.post('/consultations/get_all_scheduled_by_id_user_client', { user_id })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      let data = error.response.data;
      console.log({error: data.error, error_code: data.error_code})
      return { error: data.error, error_code: data.error_code, status: false }
    });

};

export const schedule = async (params) => {


  return axios.post('/consultations/schedule', params)
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      let data = error.response.data;
      console.log({error: data.error, error_code: data.error_code})
      return { error: data.error, error_code: data.error_code, status: false }
    });

};

export const cancel = async (consultation) => {


  return axios.post('/consultations/cancel', { consultation })
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      let data = error.response.data;
      console.log({error: data.error, error_code: data.error_code})
      return { error: data.error, error_code: data.error_code, status: false }
    });

};

export const getDefaultAvailableTimes = async () => {

  return axios.post('/default_times/get_all')
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      let data = error.response.data;
      console.log({error: data.error, error_code: data.error_code})
      return { error: data.error, error_code: data.error_code, status: false }
    });

};