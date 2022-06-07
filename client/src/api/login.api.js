import axios from 'axios';
const POST = 'post';
const loginUrl = '/api/auth/login'



export const loginApi = (data) => axios({
  method: POST,
  url: loginUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  data: data
})