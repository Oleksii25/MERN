import axios from 'axios';
const POST = 'post';
const loginUrl = 'api/links/generate'

export const createLinkApi = ({ data, token }) => {
  return axios({
    method: POST,
    url: loginUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: data
  })
}