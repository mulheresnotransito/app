import axios from './axios.service';

export const getModules = async () => {
  return axios.get('/get_modules', {})
    .then(response => { return { status: 200, data: response.data } })
    // .catch(error => { return { status: error.response.status, error: error.response.data.erro } })
    .catch(error => {
      // return { error: error.response.data.erro }
      return { error, status: false }
    })
};


export const getChapters = async () => {
  return axios.get('/get_chapters', {})
    .then(response => { return { status: 200, data: response.data } })
    // .catch(error => { return { status: error.response.status, error: error.response.data.erro } })
    .catch(error => {
      // return { error: error.response.data.erro }
      return { error, status: false }
    })
};

export const getVideos = async () => {
  return axios.get('/get_videos', {})
    .then(response => { return { status: 200, data: response.data } })
    // .catch(error => { return { status: error.response.status, error: error.response.data.erro } })
    .catch(error => {
      // return { error: error.response.data.erro }
      return { error, status: false }
    })
};
