import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.breakingbadapi.com/api/'
})

export default instance