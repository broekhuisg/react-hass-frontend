import axios from 'axios';

const REACT_APP_HASSTOKEN = process.env.REACT_APP_HASSTOKEN;
const REACT_APP_HASSURL = process.env.REACT_APP_HASSURL;

const instance = axios.create({
    baseURL: REACT_APP_HASSURL,
    headers: {
      common: {
        'Authorization': 'Bearer ' + REACT_APP_HASSTOKEN,
        'Content-Type': 'application/json'
      }
    }
});

export default instance;
