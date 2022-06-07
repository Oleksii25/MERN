import axios from 'axios';
const POST = 'post';
const loginUrl = '/api/auth/registration'



export const registrationApi = (data) => axios({
  method: POST,
  url: loginUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  data: data
})