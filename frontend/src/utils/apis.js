import axios from 'axios';

export const axiosRequest = (url, method, json, devRes) => {
  if (window.location.hostname !== 'localhost') { 
    return devRes;
  }
  else {
      if(method === 'GET') {
          if(json === {}) {
            return axios.get(url, {withCredentials: true}).then(res => {return res.data;})
          } else {
            return axios.get(url, {params: json, withCredentials: true}).then(res => {return res.data;})
          }

      } else if(method === 'POST') {
        return axios.post(url, json, {withCredentials: true}).then(res => {return res.data;})
      } else if(method === 'PUT') {
        return axios.put(url, json, {withCredentials: true}).then(res => {return res.data;})
      } else if(method === 'DELETE') {
        return axios.delete(url, {data: json, withCredentials: true}).then(res => {return res.data;})

      }
  }
};