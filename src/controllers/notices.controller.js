import axios from '../services/axios.service';

export const getAll = async () => {

  return axios.get('/notices/get_all')
    .then(response => {
      return { status: true, data: response.data }
    })
    .catch(error => {
      return { error: error.response.data.message, status: false }
    });

};